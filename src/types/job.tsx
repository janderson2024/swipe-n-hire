export function getTestJobs() {
  let testJobs: Job[] = [
    {
      JobID: 10,
      JobTitle: "Real Job",
      JobDate: "7/19/23",
      JobEmployment: "Full-Time",
      JobLocation: "City place USA",
      JobDepartment: "Human Procurement",
      JobCreator: "Person",
      JobOpen: true,
      JobOpenApplications: 40,
      JobAcceptedApplications: 10,
      JobRejectedApplications: 37,
    },
    {
      JobID: 11,
      JobTitle: "Fake Job",
      JobDate: "7/29/23",
      JobEmployment: "One Hour on Sunday",
      JobLocation: "My living room",
      JobDepartment: "Modeling",
      JobCreator: "Alien",
      JobOpen: false,
      JobOpenApplications: 30,
      JobAcceptedApplications: 2,
      JobRejectedApplications: 124,
    },
    {
      JobID: 12,
      JobTitle: "CEO",
      JobDate: "7/09/23",
      JobEmployment: "Part-Time",
      JobLocation: "New York",
      JobDepartment: "Entire Company?",
      JobCreator: "Worm",
      JobOpen: true,
      JobOpenApplications: 4,
      JobAcceptedApplications: 12,
      JobRejectedApplications: 2,
    },
  ];
  return testJobs;
}

export interface JobDb {
  Job_ID: number;
  HR_Creator_ID?: number;

  Job_Name: string;
  Job_Description?: string;
  Job_Date_Posted?: string;

  Job_Reject_Email?: string;
  Job_Accepted_Email?: string;

  Job_Salary?: string;
  Job_Location?: string;
  Job_Department?: string;
  Job_Employment_Type?: string;

  Job_Status?: "open" | "closed" | "filled";

  Open_Application_Count?: number;
  Rejected_Application_Count?: number;
  Accepted_Application_Count?: number;
}

export interface HRJobPostingsDB extends JobDb {
  Job_Date_Posted: string;
  Open_Application_Count: number;
  Employee_Name: string;
}

export interface EditJobDb extends JobDb {
  Job_Salary: string;
  Job_Location: string;
  Job_Department: string;
  Job_Employment_Type: string;
  Job_Description: string;
  Job_Rejected_Email: string;
  Job_Accepted_Email: string;
  Open_Application_Count: number;
  Rejected_Application_Count: number;
  Accepted_Application_Count: number;
}

export interface Job {
  JobID: number;

  JobTitle: string;
  JobDate?: string;
  JobCreator?: string;
  JobSalary?: string;
  JobDepartment?: string;
  JobEmployment?: string;
  JobLocation?: string;

  JobOpen: boolean;

  JobOpenApplications: number;
  JobAcceptedApplications: number;
  JobRejectedApplications: number;
}

export interface ApplicantJobs {
  JobID: number;
  JobTitle: string;
  JobDate?: string;
  JobSalary?: string;
  JobDepartment?: string;
  JobEmployment?: string;
  JobLocation?: string;
}

export interface Applications {
  Job_ID: number;
  Application_ID?: number;
  Applicant_Name: string;
  Applicant_Email?: string;
  Applicant_Phone?: string;
  Applicant_Links?: string;
  Applicant_Status?: string;
  Applicant_Legal?: 1;
  Application_Date?: Date;
  Applicant_Resume?: string;
}

export interface ApplicationsForHR extends Applications {
  Applicant_Name: string;
  Applicant_Email: string;
  Applicant_Resume: string;
}
