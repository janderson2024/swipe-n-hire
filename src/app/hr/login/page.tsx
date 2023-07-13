import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'


/*
TOTALLY TEMPORARY TO HELP ME TEST "LOGIN LOGIC" IN THE HR JOB POSTINGS VIEW /HR

You can change up the return () with the actual styling

*/
export default function HRLogin(){
    async function addCookie(data: any) {
        'use server'
        cookies().set('userID', 'John Johnson')
        redirect("./hr")
      }


     
      return (
        <form action={addCookie}>
          <button type="submit">Add a login cookie</button>
        </form>
      )
}