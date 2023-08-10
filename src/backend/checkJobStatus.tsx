import dbConn from "@/backend/databaseConnect";

export async function isJobFilled(Job_ID: number | string) {
  const checkJobExists = "SELECT `Job_ID` FROM `Jobs` WHERE `Job_ID` = ? AND `Job_Status` = 'open'";
  const dbResult = await dbConn.execute(checkJobExists, [Job_ID]);
  return dbResult.size == 1;
}

export async function isJobOpen(Job_ID: number | string){
  const checkJobExists = "SELECT `Job_ID` FROM `Jobs` WHERE `Job_ID` = ? AND `Job_Status` = 'open'";
  const dbResult = await dbConn.execute(checkJobExists, [Job_ID]);
  return dbResult.size == 1;
}