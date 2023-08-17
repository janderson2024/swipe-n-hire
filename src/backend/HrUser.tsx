"use server";

import { cookies } from "next/headers";
import dbConn from "@/backend/databaseConnect";
import { HRDb } from "@/types/hr";

const COOKIE_NAME = "userID";

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
    `Logged in User: ${userID} with email: ${email} password: ********`
  );

  cookies().set(COOKIE_NAME, await signCookie(userID.toString()));
  return { success: "we succeeeded" };
}

export async function logoutUser(){
  cookies().delete(COOKIE_NAME);
  return "logged out";
}

export async function getCurrentHrID() {
  const IDCookie = cookies().get(COOKIE_NAME);
  if (!IDCookie) {
    return false;
  }
  return unsignCookie(IDCookie.value);
}
