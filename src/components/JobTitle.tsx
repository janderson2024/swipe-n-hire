import dbConn from "@/backend/databaseConnect";

export async function getJobName(jobId: string) {
  try {
    const getJobNameSQL = "SELECT `Job_Name` FROM `Jobs` WHERE `Job_ID` = ?";
    const [rows] = await dbConn.execute(getJobNameSQL, [jobId]);

    if (rows.length > 0) {
      const jobName = rows[0].Job_Name;
      return jobName;
    } else {
      throw new Error("Job not found.");
    }
  } catch (error) {
    console.error("Error getting job name:", error);
    throw error;
  }
}
