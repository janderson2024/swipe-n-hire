"use server";

import { JobDb } from "@/types/job";
import dbConn from "@/backend/databaseConnect";

export default async function ApplicantJobPostings() {
  const getJobsSQL =
    "SELECT Job_ID as JobID, Job_Name as JobTitle, Job_Salary as JobSalary, Job_Location as JobLocation, Job_Department as JobDepartment, Job_Employment_Type as JobEmployment, Job_Date_Posted as JobDate FROM `Jobs`";

  try {
    console.log(getJobsSQL);
    const result = await dbConn.execute(getJobsSQL);
    const jobs: JobDb[] = result.rows as JobDb[];
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
