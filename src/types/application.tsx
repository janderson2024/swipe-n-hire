export interface ApplicationDb {
  Application_ID: number;
  Job_ID?: number;
  Applicant_Name?: string;
  Applicant_Email?: string;
  Applicant_Phone?: string;
  Applicant_Link?: string;
  Applicant_Status?: "Created" | "Rejected" | "Accepted" | "Archived";
  Applicant_Legal?: boolean;
  Application_Date?: string;
  Applicant_Resume?: string;
  Applicant_IP?: string;
  Applicant_User_Agent?: string;
}
