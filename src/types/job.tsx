export interface JobDb {
  Job_ID: number;
  HR_Creator_ID?: number;

  Job_Name: string;
  Job_Description?: string;
  Job_Date_Posted?: string;

  Job_Rejected_Email?: string;
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

export interface JobMetaDataDB extends JobDb {
  Job_Description: string;
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

export interface ApplicationDB {
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

export interface ApplicationsForHR extends ApplicationDB {
  Applicant_Name: string;
  Applicant_Email: string;
  Applicant_Resume: string;
}
