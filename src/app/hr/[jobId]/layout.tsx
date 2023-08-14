import { isJobNotFilled } from "@/backend/checkJobStatus";
import { redirect } from "next/navigation";

export default async function HRJobsLayout({
  children,
  params,
}: {
  children: React.ReactNode | any;
  params: { jobId: string };
}) {
  if (await isJobNotFilled(params.jobId)) {
    return (
        children
    );
  } else {
    redirect("/hr");
  }
}
