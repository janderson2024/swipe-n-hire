import Link from "next/link";

import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
  RightItem?: React.FC<{ job: Job }>;
}

export default function JobCard({ job, RightItem }: JobCardProps) {
  const jobLink = "/careers/" + job.JobID;
  return (
    <div className="flex w-5/6">
      <div id="leftSide" className="flex flex-col">
        <span className="pl-2 text-slate-400 text-sm">ID: #{job.JobID}</span>
        <Link href={jobLink}>
          <span className="text-violet-600 text-xl font-bold underline">
            {job.JobTitle}
          </span>
        </Link>
        <span className="pl-2 text-slate-400 text-sm">
          Posted: {job.JobDate}
        </span>
      </div>
      <div id="rightSide" className="grow">
        {RightItem && <RightItem job={job} />}
      </div>
    </div>
  );
}
