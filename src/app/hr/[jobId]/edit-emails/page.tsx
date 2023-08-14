"use client";
import getJob from "@/backend/getJob";
import updateHREmails from "@/backend/updateHREmails";
import { useEffect, useState } from "react";

export default function EditEmails({ params }: { params: { jobId: string } }) {
  const [jobTitle, setJobTitle] = useState("");
  const [interviewEmail, setInterviewEmail] = useState("");
  const [rejectionEmail, setRejectionEmail] = useState("");

  const getJobData = async () => {
    const findJob = await getJob(params.jobId);
    setInterviewEmail(findJob.Job_Accepted_Email);
    setRejectionEmail(findJob.Job_Rejected_Email);
    setJobTitle(findJob.Job_Name);
  };

  useEffect(() => {
    getJobData();
  }, []);

  const changesSubmitted = async function () {
    await updateHREmails(params.jobId, interviewEmail, rejectionEmail);
    alert("Your emails have been saved!");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold m-5 text-center">{jobTitle}</h1>
        <h2 className="text-2xl block text-center font-semibold text-purple-700">
          Customize Emails
        </h2>
        <hr className="mt-3"></hr>
      </div>
      <main>
        <div className="h-min-screen px-10 py-5">
          <div className="mt-3 p-6">
            <label htmlFor="interviewEmail" className="block text-base mb-2">
              Interview Invitation Email
            </label>
            <textarea
              value={interviewEmail}
              onChange={(e) => setInterviewEmail(e.target.value)}
              id="interviewEmail"
              name="interviewEmail"
              placeholder="Enter interview invitation here"
              rows={8}
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
            />
          </div>
          <div className="mt-3 p-6">
            <label htmlFor="rejectionEmail" className="block text-base mb-2">
              Rejection Email
            </label>
            <textarea
              value={rejectionEmail}
              onChange={(e) => setRejectionEmail(e.target.value)}
              id="rejectionEmail"
              name="rejectionEmail"
              placeholder="Enter rejection email here"
              rows={8}
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={changesSubmitted}
              type="button"
              className="justify-center p-4 border-4 border-purple-300 bg-purple-100 hover:bg-purple-200 rounded py-1"
            >
              Submit Changes
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
