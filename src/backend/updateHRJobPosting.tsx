"use server";

import dbConn from "@/backend/databaseConnect";

export default async function updateHRjobPosting(
  jobId: string,
  jobTitle: string,
  department: string,
  emplType: string,
  salaryRange: string,
  location: string,
  jobDescription: string
) {
  const updateDB =
    "UPDATE Jobs SET Job_Name = ?, Job_Department = ?, Job_Employment_Type = ?, Job_Salary = ?, Job_Location = ?, Job_Description = ? WHERE Job_ID = ?";

  const jobPostingUpdated = await dbConn.execute(updateDB, [
    jobTitle,
    department,
    emplType,
    salaryRange,
    location,
    jobDescription,
    jobId,
  ]);
  console.log("DB updated successfully");
}
