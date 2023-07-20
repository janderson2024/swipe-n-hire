'use server'

import dbConn from "@/backend/databaseConnect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function createNewPosting(data: any){
    const createNewPostingSQL = "INSERT INTO `Jobs`"+
    "(`HR_Creator_ID`, `Job_Name`, `Job_Description`, "+
    "`Job_Status`, `Open_Application_Count`, `Rejected_Application_Count`, "+
    "`Accepted_Application_Count`, `Job_Date_Posted`)"+
    "VALUES (?, 'New Posting', 'Description...', 'open', 0, 0, 0, now());";
    
    const cookieStore = cookies();
    const userID = cookieStore.get("userID");
    if(!userID){
        console.log("User shouldn't be able to post here unless they were logged in");
        return
    }
    const PostCreatorId: number = parseInt(userID.value);

    const result = await dbConn.execute(createNewPostingSQL, [PostCreatorId]);
    console.log("Created new Posting");
    const newPosting = '/hr/'+result.insertId+'/edit-posting';

    redirect(newPosting);
    
  }
