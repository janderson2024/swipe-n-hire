"use server";

import { HRJobPostingsDB } from "@/types/job";
import HRLoggedIn from "./loggedin";
import dbConn from "@/backend/databaseConnect";
import { getCurrentHrID } from "@/backend/HrUser";

export default async function HRJobPostings() {

  const getJobsSQL = "SELECT Jobs.Job_ID, Jobs.HR_Creator_ID, HR.Employee_Name, "+
  "Jobs.Job_Name, Jobs.Job_Status, "+
  "Jobs.Open_Application_Count, Jobs.Rejected_Application_Count, "+
  "Jobs.Accepted_Application_Count, Jobs.Job_Date_Posted "+
  "FROM Jobs INNER JOIN HR ON Jobs.HR_Creator_ID = HR.Employee_ID " +
  "WHERE Jobs.Job_Status = 'open' OR  Jobs.Job_Status = 'closed'";

  //const jobs: HRJobPostingsDB[] = test_jobs as HRJobPostingsDB[];
  //console.log("using test cache!!!!");
  const result = await dbConn.execute(getJobsSQL);
  const jobs: HRJobPostingsDB[] = result.rows as HRJobPostingsDB[];

  const myUserID = await getCurrentHrID();
  if(!myUserID){
    return; //shuts typescript up. you can never get to here
  }

  //this HRLoggedIn is a client comp
  return <HRLoggedIn jobs={jobs} userId={myUserID}/>;
}
