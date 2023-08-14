import NavBar from "@/components/navbar";
import HRProfileImage from "@/components/HRProfileImage";
import Link from "next/link";
import BackToOpenings from "@/components/BackToOpenings";
import { isJobNotFilled } from "@/backend/checkJobStatus";
import { redirect } from "next/navigation";

function PostingsNavBar(jobId: string) {
  return (
    <>
      <Link href={`/hr/${jobId}/edit-posting`} className="text-white">Edit Posting</Link>
      <Link href={`/hr/${jobId}/resumes`} className="text-white">Resumes</Link>
      <Link href={`/hr/${jobId}/edit-emails`} className="text-white">Customize Emails</Link>
    </>
  );
}

export default async function HRJobsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { jobId: string };
}) {
  if (await isJobNotFilled(params.jobId)) {
    return (
      <>
        <NavBar
          LeftItem={BackToOpenings("/hr")}
          CenterItem={PostingsNavBar(params.jobId)}
          RightItem={<HRProfileImage />}
        />
        {children}
      </>
    );
  } else {
    redirect("/hr");
  }
}
