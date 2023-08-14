"use server";

import Link from "next/link";
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
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold mt-4">
          {job.Job_Name} - Job ID: {job.Job_ID}
        </h1>
        <div className="w-full md:w-2/3 flex justify-between mb-4 px-6">
          <div className="text-left">
            <p>
              <b>Department:</b> {job.Job_Department}
            </p>
            <p>
              <b>Employment Type:</b> {job.Job_Employment_Type}
            </p>
          </div>
          <div className="text-right">
            <p>
              <b>Salary Range:</b> {job.Job_Salary}
            </p>
            <p>
              <b>Location:</b> {job.Job_Location}
            </p>
          </div>
        </div>

        <textarea
          value={
            job.Job_Description +
            "\n" +
            job.Job_Description +
            "\n" +
            job.Job_Description
          }
          id="jobDescription"
          name="jobDescription"
          placeholder="Enter job description here"
          readOnly={true}
          rows={16}
          className="resize-none mb-4 overflow-y-auto border rounded w-2/3 text-base px-2 py-1 border-purple-600 focus:outline-0"
        />
        <div className="flex justify-center">
          <Link href={`/careers/${job.Job_ID}/apply`}>
            <button className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded">
              Apply for this Job
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default JobDescription;
