import type { Metadata } from "next";

import NavBar from "@/components/navbar";
import Logo from "@/components/Logo";
import BackToOpenings from "@/components/BackToOpenings";
import { isJobOpen } from "@/backend/checkJobStatus";
import { redirect } from "next/navigation";

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
