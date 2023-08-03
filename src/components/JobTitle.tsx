"use server";

import dbConn from "@/backend/databaseConnect";
import { JobDb } from "@/types/job";

async function getJob(jobId: string) {
  const getJobsSQL = "SELECT * from `Jobs` WHERE `Job_ID` = ?";
  const result = await dbConn.execute(getJobsSQL, [jobId]);
  console.log(result);
  const job: JobDb = result.rows[0] as JobDb;
  return job;
}

async function JobTitle({ params }: { params: { jobId: string } }) {
  const job = await getJob(params.jobId);

  return (
      <h1 className="text-lg font-bold mb-4">
        {job.Job_Name} - Job ID: {job.Job_ID}
      </h1>
  );
}

export default JobTitle;
