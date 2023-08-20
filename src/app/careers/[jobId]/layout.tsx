import NavBar from "@/components/Navbar";
import Logo, { getCompanyName } from "@/components/Logo";
import BackToOpenings from "@/components/BackToOpenings";
import { isJobOpen } from "@/backend/checkJobStatus";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import dbConn from "@/backend/databaseConnect";
import { JobMetaDataDB } from "@/types/job";

type Props = {
  params: { jobId: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company_name = getCompanyName();

  const MetadataSQL =
    "SELECT `Job_ID`, `Job_Name`, `Job_Description` FROM `Jobs` Where `Job_ID` = ?";
  const result = await dbConn.execute(MetadataSQL, [params.jobId]);
  const job = result.rows[0] as JobMetaDataDB;

  const title = company_name + " | " + job.Job_Name;

  const maxChars = Math.min(job.Job_Description.length, 100);
  const description =
    job.Job_Description.slice(0, maxChars) + "...";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
    },
  };
}

export default async function HRJobsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { jobId: string };
}) {
  if (await isJobOpen(params.jobId)) {
    return (
      <>
        <NavBar LeftItem={<Logo />} RightItem={BackToOpenings("/careers")} />
        {children}
      </>
    );
  } else {
    redirect("/careers");
  }
}
