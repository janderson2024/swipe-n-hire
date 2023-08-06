"use server";

import dbConn from "@/backend/databaseConnect";

export default async function updateApplicantStatus(
  applicantId: string,
  newStatus: string
) {
  let updateDB =
    "UPDATE Applications SET Applicant_Status = ? WHERE Application_ID = ?";

  const e = await dbConn.execute(updateDB, [newStatus, applicantId]);
}
