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
  const description =
    job.Job_Description.slice(Math.min(100, job.Job_Description.length)) +
    "...";

  return {
    title: title,
    description: description,
    authors: [
      { name: "Monica Tuttle" },
      { name: "Dennis Bowen" },
      { name: "Joshua Anderson" },
    ],
    openGraph: {
      title: title,
      description: description,
      url: "https://swipe-n-hire.com",
      images: [
        { url: "/purple-icon.png", width: 192, height: 192 },
        { url: "/white-icon.png", width: 192, height: 192 },
      ],
      locale: "en-US",
      type: "website",
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
