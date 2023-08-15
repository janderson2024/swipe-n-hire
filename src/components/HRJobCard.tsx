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
          <span className="flex text-purple-700 hover:text-purple-400 text-xl font-bold ">
            {job.Job_Name}
             <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 ml-1 self-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
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
