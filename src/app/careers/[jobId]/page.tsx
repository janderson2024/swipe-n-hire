"use server";
import NavBar from "@/components/navbar";
import Logo from "@/components/Logo";
import Link from "next/link";
import BackToOpenings from "@/components/BackToOpenings";

import dbConn from "@/backend/databaseConnect";
import { JobDb } from "@/types/job";

async function getJob(jobId: string) {
  const getJobsSQL = "SELECT * from `Jobs` WHERE `Job_ID` = ?";
  const result = await dbConn.execute(getJobsSQL, [jobId]);
  console.log(result);
  const job: JobDb = result.rows[0] as JobDb;
  return job;
}

async function JobDescription({ params }: { params: { jobId: string } }) {
  const job = await getJob(params.jobId);

  return (
    <>
      <NavBar LeftItem={<Logo />} RightItem={BackToOpenings("/careers")} />
      <main className="flex flex-col items-center justify-center">
        <div className="w-full md:w-2/3 flex justify-between mt-4 px-6">
          <div className="text-left">
            <p>Department: {job.Job_Department}</p>
            <p>Employment Type: {job.Job_Employment_Type}</p>
          </div>
          <div className="text-right">
            <p>Salary Range: {job.Job_Salary}</p>
            <p>Location: {job.Job_Location}</p>
          </div>
        </div>
        <h1 className="text-lg font-bold mb-4">
          {job.Job_Name} - Job ID: {job.Job_ID}
        </h1>
        <textarea
          value={job.Job_Description}
          id="jobDescription"
          name="jobDescription"
          placeholder="Enter job description here"
          rows={8}
          className="border w-2/3 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
        />
        <div className="flex justify-center">
          <button className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded">
            <Link
              href={`/careers/${job.Job_ID}/apply?jobId=${
                job.Job_ID
              }&jobName=${encodeURIComponent(job.Job_Name)}`}
            >
              Apply for this Job
            </Link>
          </button>
        </div>
      </main>
    </>
  );
}

export default JobDescription;
