"use server";

import dbConn from "@/backend/databaseConnect";

export async function updateJobStatus(job_ID: number, status: boolean) {
  let statusString = "";
  if (status) {
    statusString = "closed";
  } else {
    statusString = "open";
  }

  const updateSQL =
    "UPDATE `Jobs` " + "SET `Job_Status` = ? " + "WHERE `Job_ID` = ?";

  const result = await dbConn.execute(updateSQL, [statusString, job_ID]);
  if (result) {
    return "Updated open/closed for job with id of: " + job_ID;
  } else {
    return "We failed... uhoh";
  }
}
