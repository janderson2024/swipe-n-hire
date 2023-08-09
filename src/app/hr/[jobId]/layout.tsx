import type { Metadata } from "next";

import NavBar from "@/components/navbar";
import HRProfileImage from "@/components/HRProfileImage";
import Link from "next/link";
import BackToOpenings from "@/components/BackToOpenings";
import checkJobExists from "@/backend/checkJobExists";
import { redirect } from "next/navigation";

function PostingsNavBar(jobId: string) {
  return (
    <>
      <Link href={`/hr/${jobId}/edit-posting`}>Edit Posting</Link>
      <Link href={`/hr/${jobId}/resumes`}>Resumes</Link>
      <Link href={`/hr/${jobId}/edit-emails`}>Customize Emails</Link>
    </>
  );
}

export const metadata: Metadata = {
  title: "Real Company HR Portal",
  description: "IDK what to put here, but yeah. This is our project 3",
};

export default async function HRJobsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { jobId: string };
}) {
  if (await checkJobExists(params.jobId)) {
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
