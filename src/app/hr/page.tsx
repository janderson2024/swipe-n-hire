"use server";

import { HRJobPostingsDB } from "@/types/job";
import HRLoggedIn from "./loggedin";
import dbConn from "@/backend/databaseConnect";


export default async function HRJobPostings() {
  const getJobsSQL = "SELECT Jobs.Job_ID, HR.Employee_Name, "+
  "Jobs.Job_Name, Jobs.Job_Status, "+
  "Jobs.Open_Application_Count, Jobs.Rejected_Application_Count, "+
  "Jobs.Accepted_Application_Count, Jobs.Job_Date_Posted "+
  "from Jobs INNER JOIN HR ON Jobs.HR_Creator_ID = HR.Employee_ID";

  const result = await dbConn.execute(getJobsSQL);
  const jobs: HRJobPostingsDB[] = result.rows as HRJobPostingsDB[];

  //this HRLoggedIn is a client comp
  return <HRLoggedIn jobs={jobs}/>;
}
