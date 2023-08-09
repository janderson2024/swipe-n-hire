import dbConn from "@/backend/databaseConnect";
export default async function doesJobExist(Job_ID: number | string) {
  const checkJobExists = "SELECT `Job_ID` FROM `Jobs` WHERE `Job_ID` = ?";
  const dbResult = await dbConn.execute(checkJobExists, [Job_ID]);
  return dbResult.size == 1;
}