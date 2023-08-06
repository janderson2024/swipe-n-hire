"use server";

import dbConn from "@/backend/databaseConnect";
import { ApplicationsForHR } from "@/types/job";

export default async function getEditJob(jobId: string) {
  const getJobsSQL =
    "SELECT * from `Applications` WHERE `Job_ID` = ? AND `Applicant_Status` = ?";
  const result = await dbConn.execute(getJobsSQL, [jobId, "Pending"]);
  const applications: ApplicationsForHR[] = result.rows as ApplicationsForHR[];
  return applications;
}
