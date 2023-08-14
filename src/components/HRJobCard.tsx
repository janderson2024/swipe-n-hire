import Link from "next/link";

import { HRJobPostingsDB } from "@/types/job";

interface JobCardProps {
  job: HRJobPostingsDB;
  RightItem?: React.FC<{ job: HRJobPostingsDB }>;
}

export default function HRJobCard({ job, RightItem }: JobCardProps) {
  const jobLink = "/careers/" + job.Job_ID;
  return (
    <div className="flex w-5/6 flex-col flex-wrap sm:flex-nowrap sm:flex-row p-4">
      <div
        id="leftSide"
        className="flex flex-row sm:w-1/3 sm:flex-col sm:grow-0"
      >
        <span className="pl-2 text-slate-400 text-sm hidden sm:block">
          ID: #{job.Job_ID}
        </span>
        <Link
          href={jobLink}
          target="_blank"
          className="self-center sm:place-self-start"
        >
          <span className="text-purple-700 hover:text-purple-400 text-xl font-bold ">
            {job.Job_Name}
          </span>
        </Link>
        <span className="pl-2 text-slate-400 text-sm hidden sm:block">
          Posted: {job.Job_Date_Posted}
        </span>
      </div>
      <div id="rightSide" className="grow sm:w-2/3">
        {RightItem && <RightItem job={job} />}
      </div>
    </div>
  );
}
