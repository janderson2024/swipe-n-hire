"use server";

import dbConn from "@/backend/databaseConnect";

export default async function updateJobStatusDB(
  jobId: string,
  jobStatus: string
) {
  const updateDB = "UPDATE Jobs SET Job_Status = ? WHERE Job_ID = ?";

  const jobStatusUpdated = await dbConn.execute(updateDB, [jobStatus, jobId]);
  console.log("Job status successfully");
}
