"use server";

import { HRJobPostingsDB } from "@/types/job";
import HRLoggedIn from "./loggedin";
import dbConn from "@/backend/databaseConnect";
import { getHrUserId } from "@/backend/getHrUser";


export default async function HRJobPostings() {
  /*const test_jobs = [
    {
      Job_ID: 1,
      HR_Creator_ID: 1,
      Employee_Name: 'John Johnson',
      Job_Name: 'Real Job',
      Job_Status: 'open',
      Open_Application_Count: 1,
      Rejected_Application_Count: 0,
      Accepted_Application_Count: 0,
      Job_Date_Posted: '2023-07-20'
    },
    {
      Job_ID: 2,
      HR_Creator_ID: 1,
      Employee_Name: 'John Johnson',
      Job_Name: 'Real Job2',
      Job_Status: 'closed',
      Open_Application_Count: 0,
      Rejected_Application_Count: 5,
      Accepted_Application_Count: 10,
      Job_Date_Posted: '2023-07-20'
    },
    {
      Job_ID: 3,
      HR_Creator_ID: 1,
      Employee_Name: 'John Johnson',
      Job_Name: 'CEO',
      Job_Status: 'open',
      Open_Application_Count: 3,
      Rejected_Application_Count: 20,
      Accepted_Application_Count: 1,
      Job_Date_Posted: '2023-07-20'
    },
    {
      Job_ID: 4,
      HR_Creator_ID: 1,
      Employee_Name: 'John Johnson',
      Job_Name: 'New Posting',
      Job_Status: 'open',
      Open_Application_Count: 0,
      Rejected_Application_Count: 0,
      Accepted_Application_Count: 0,
      Job_Date_Posted: '2023-07-20'
    },
    {
      Job_ID: 5,
      HR_Creator_ID: 1,
      Employee_Name: 'John Johnson',
      Job_Name: 'New Posting',
      Job_Status: 'open',
      Open_Application_Count: 0,
      Rejected_Application_Count: 0,
      Accepted_Application_Count: 0,
      Job_Date_Posted: '2023-07-20'
    },
    {
      Job_ID: 6,
      HR_Creator_ID: 1,
      Employee_Name: 'John Johnson',
      Job_Name: 'New Posting',
      Job_Status: 'open',
      Open_Application_Count: 0,
      Rejected_Application_Count: 0,
      Accepted_Application_Count: 0,
      Job_Date_Posted: '2023-07-20'
    },
    {
      Job_ID: 7,
      HR_Creator_ID: 1,
      Employee_Name: 'John Johnson',
      Job_Name: 'New Posting',
      Job_Status: 'open',
      Open_Application_Count: 0,
      Rejected_Application_Count: 0,
      Accepted_Application_Count: 0,
      Job_Date_Posted: '2023-07-21'
    },
    {
      Job_ID: 9,
      HR_Creator_ID: 1,
      Employee_Name: 'John Johnson',
      Job_Name: 'New Posting',
      Job_Status: 'open',
      Open_Application_Count: 0,
      Rejected_Application_Count: 0,
      Accepted_Application_Count: 0,
      Job_Date_Posted: '2023-07-24'
    }
  ];*/


  const getJobsSQL = "SELECT Jobs.Job_ID, Jobs.HR_Creator_ID, HR.Employee_Name, "+
  "Jobs.Job_Name, Jobs.Job_Status, "+
  "Jobs.Open_Application_Count, Jobs.Rejected_Application_Count, "+
  "Jobs.Accepted_Application_Count, Jobs.Job_Date_Posted "+
  "from Jobs INNER JOIN HR ON Jobs.HR_Creator_ID = HR.Employee_ID";

  //const jobs: HRJobPostingsDB[] = test_jobs as HRJobPostingsDB[];
  //console.log("using test cache!!!!");
  const result = await dbConn.execute(getJobsSQL);
  const jobs: HRJobPostingsDB[] = result.rows as HRJobPostingsDB[];

  const myUserID = await getHrUserId();
  if(!myUserID){
    return; //shuts typescript up. you can never get to here
  }

  //this HRLoggedIn is a client comp
  return <HRLoggedIn jobs={jobs} userId={myUserID}/>;
}
