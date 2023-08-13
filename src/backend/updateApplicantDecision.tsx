"use server";

import dbConn from "@/backend/databaseConnect";

export default async function updateApplicantDecision(
  jobId: string,
  isAccepted: Boolean
) {
  let updateDB = "";
  const acceptAppCount = "Accepted_Application_Count";
  const rejectedAppCount = "Reject_Application_Count";
  if (isAccepted) {
    updateDB =
      "UPDATE Jobs SET Accepted_Application_Count = Accepted_Application_Count + 1, Open_Application_count = Open_Application_Count - 1 WHERE Job_ID = ?";
  } else {
    updateDB =
      "UPDATE Jobs SET Rejected_Application_Count = Rejected_Application_Count + 1, Open_Application_count = Open_Application_Count - 1 WHERE Job_ID = ?";
  }

  const e = await dbConn.execute(updateDB, [jobId]);
}
