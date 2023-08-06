"use server";

import dbConn from "@/backend/databaseConnect";

export default async function updateHREmails(
  jobId: string,
  accept: string,
  reject: string
) {
  const updateDB =
    "UPDATE Jobs SET Job_Accepted_Email = ?, Job_Rejected_Email = ? WHERE Job_ID = ?";

  const emailUpdated = await dbConn.execute(updateDB, [accept, reject, jobId]);
}
