"use server";

import { cookies } from "next/headers";
import dbConn from "@/backend/databaseConnect";
import { HRDb } from "@/types/hr";
import { redirect } from "next/navigation";

async function signCookie(cookie: string) {
  return cookie + ":" + (await hashInput(cookie));
}
async function unsignCookie(cookie: string) {
  const [value, signature] = cookie.split(":");

  if ((await hashInput(value)) === signature) {
    return value;
  }
  return false;
}
async function hashInput(password: string) {
  return password;
}

export async function loginUser(email: string, password: string) {
  if (email == "" || password == "") {
    return { error: "ERROR: Email and Password need to be filled in!" };
  }

  password = await hashInput(password.toString());

  //console.log(userEmail, userPassword);

  const userSQL =
    "SELECT `Employee_ID` " +
    "FROM `HR` " +
    "WHERE `EMPLOYEE_EMAIL` = ? " +
    "AND `EMPLOYEE_PASSWORD` = ?;";

  const result = await dbConn.execute(userSQL, [email, password]);

  if (result.rows.length == 0) {
    return { error: "ERROR: Email or password does not match!" };
  }

  const user: HRDb = result.rows[0] as HRDb;
  const userID = user.Employee_ID;

  console.log(
    `Logged in User: ${userID} with email: ${email} password: ${password}`
  );

  cookies().set("userID", await signCookie(userID.toString()));
  return { success: "we succeeeded" };
}

export async function getCurrentHrID() {
  const cookieStore = cookies();
  const IDCookie = cookieStore.get("userID");
  if (!IDCookie) {
    return false;
  }
  console.log(IDCookie.value);
  return unsignCookie(IDCookie.value);
}
