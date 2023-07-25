"use server";

import { JobDb } from "@/types/job";
import dbConn from "@/backend/databaseConnect";

export default async function ApplicantJobPostings() {
  const getJobsSQL =
    "SELECT Job_ID, Job_Name, Job_Salary, Job_Location, Job_Department, Job_Employment_Type, Job_Date_Posted FROM `Jobs`";

  try {
    const result = await dbConn.execute(getJobsSQL);
    const jobs: JobDb[] = result.rows as JobDb[];
    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
