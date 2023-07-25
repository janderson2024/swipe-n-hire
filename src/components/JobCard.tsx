import Link from "next/link";

import { HRJobPostingsDB, JobDb } from "@/types/job";

interface JobCardProps {
  job: HRJobPostingsDB;
  RightItem?: React.FC<{ job: HRJobPostingsDB }>;
}

export default function JobCard({ job, RightItem }: JobCardProps) {
  const jobLink = "/careers/" + job.Job_ID;
  return (
    <div className="flex w-5/6 flex-col flex-wrap sm:flex-nowrap sm:flex-row pt-2">
      <div id="leftSide" className="flex flex-row grow sm:flex-col sm:grow-0">
        <span className="pl-2 text-slate-400 text-sm hidden sm:block">
          ID: #{job.Job_ID}
        </span>
        <Link href={jobLink} className="self-center sm:place-self-start">
          <span className="text-violet-600 text-xl font-bold underline ">
            {job.Job_Name}
          </span>
        </Link>
        <span className="pl-2 text-slate-400 text-sm hidden sm:block">
          Posted: {job.Job_Date_Posted}
        </span>
      </div>
      <div id="rightSide" className="grow">
        {RightItem && <RightItem job={job} />}
      </div>
    </div>
  );
}
