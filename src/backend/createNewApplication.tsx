"use server";

import dbConn from "@/backend/databaseConnect";
export default async function createNewApplication(data: any) {
  console.log(data)

  try {
    // validate
    if (!data.Job_ID) {
      throw new Error("Job_ID is missing or invalid.");
    }

    //TODO: resume stuff

    // SQL
    const createNewApplicationSQL =
      "INSERT INTO `Applications`" +
      "(`Job_ID`, `Applicant_Name`, `Applicant_Email`, " +
      "`Applicant_Phone`, `Applicant_Links`, `Applicant_Status`, " +
      "`Applicant_Legal`, `Application_Date`, `Applicant_Resume`)" +
      "VALUES (?, ?, ?, ?, ?, 'Pending', ?, now(), ?);";
      
    const sqlData=[data.Job_ID, data.Applicant_Name, data.Applicant_Email, data.Applicant_Phone, data.Applicant_Links, data.Applicant_Legal, data.Applicant_Resume]
    const result = await dbConn.execute(createNewApplicationSQL, sqlData);
    //console.log(result);

    const updateJobStatusSQL =
    "UPDATE `Jobs` "+
    "SET `Open_Application_Count` = `Open_Application_Count` + 1 "+
    "WHERE `Job_ID` = ?;";

    const statusResult = await dbConn.execute(updateJobStatusSQL, [data.Job_ID]);
    //console.log(statusResult);

  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  }
}
