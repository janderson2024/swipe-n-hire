"use server";

import { JobDb } from "@/types/job";
import dbConn from "@/backend/databaseConnect";
import JobDescription from "./careers-client";

export default async function JobDescriptionPage({
  params,
}: {
  params: { jobId: string };
}) {
  const getJobsSQL = "SELECT * from `Jobs` WHERE `Job_ID` = ?";
  const result = await dbConn.execute(getJobsSQL, [params.jobId]);
  //console.log(result);
  const job: JobDb = result.rows[0] as JobDb;

  return <JobDescription job={job}></JobDescription>;
}
