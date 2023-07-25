"use server"

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'


export default async function addCookie(data: any) {
    //validate request
  
    //do SQL stuff
  
    //give user login cookie
    cookies().set('userID', "2")
  
    //redirect
    redirect("./hr")
  }