"use server";

import { cookies } from "next/headers";

export default async function getHrUser() {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");
  console.log(userID);
  return userID;
}

export async function getHrUserId() {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");
  return userID?.value;
}
