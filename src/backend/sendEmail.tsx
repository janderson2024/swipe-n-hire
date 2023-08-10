"use server"
import { Resend } from 'resend';
const resend = new Resend(process.env['RESEND_API']);


//example to use:
//await sendEmail("josh@janderson2024.me", "Update about job: [job title]", "<b>Hello world!</b>");

export default async function sendEmail(recipient:string, subject:string, emailBody:string) {
  console.log(`Sending email to ${recipient}`);
  try {
    const data = await resend.emails.send({
      from: 'Company Name <no-reply@swipe-n-hire.com>',
      to: [recipient],
      subject: subject,
      text: emailBody,
    });
    console.log("Email sent.")
  } catch (error) {
    console.error("Email failed.");
    console.error(error);
  }
}