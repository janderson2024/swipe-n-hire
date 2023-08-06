"use server";

import dbConn from "@/backend/databaseConnect";
import { EditJobDb } from "@/types/job";

export default async function getEditJob(jobId: string) {
  const getJobsSQL = "SELECT * from `Jobs` WHERE `Job_ID` = ?";
  const result = await dbConn.execute(getJobsSQL, [jobId]);
  const job: EditJobDb = result.rows[0] as EditJobDb;
  return job;
}
