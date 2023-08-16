"use client";
import getJob from "@/backend/getJob";
import updateHREmails from "@/backend/updateHREmails";
import PostingsNavBar from "@/components/PostingsNavBar";
import { useEffect, useState } from "react";

export default function EditEmails({ params }: { params: { jobId: string } }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobID, setJobID] = useState(0);
  const [interviewEmail, setInterviewEmail] = useState("");
  const [rejectionEmail, setRejectionEmail] = useState("");

  const [initInterviewEmail, setInitInterviewEmail] = useState("");
  const [initRejectionEmail, setInitRejectionEmail] = useState("");

  const getJobData = async () => {
    const findJob = await getJob(params.jobId);
    setJobID(findJob.Job_ID);
    setInterviewEmail(findJob.Job_Accepted_Email);
    setInitInterviewEmail(findJob.Job_Accepted_Email);
    setRejectionEmail(findJob.Job_Rejected_Email);
    setInitRejectionEmail(findJob.Job_Rejected_Email);
    setJobTitle(findJob.Job_Name);
  };

  useEffect(() => {
    getJobData();
  }, []);

  const changesSubmitted = async function () {
    await updateHREmails(params.jobId, interviewEmail, rejectionEmail);
    setInitInterviewEmail(interviewEmail);
    setInitRejectionEmail(rejectionEmail);
    alert("Your emails have been saved!");
  };

  return (
    <>
      <PostingsNavBar jobId={params.jobId} segment="edit-emails" />
      <main className="h-main-under-nav p-4">
        <div>
          <h1 className="text-2xl font-bold text-center">{jobTitle}</h1>
          <hr className="mt-3"></hr>
        </div>
        <section id="Email section" className="h-4/5 px-5 pt-5">
          <div id="Emails" className="sm:flex h-full">
            <div id="Interview-email" className="grow h-full p-2">
              <label htmlFor="interviewEmail" className="block text-base mb-2">
                <b>Interview Invitation Email</b>
              </label>
              <textarea
                value={interviewEmail}
                onChange={(e) => setInterviewEmail(e.target.value)}
                id="interviewEmail"
                name="interviewEmail"
                placeholder="Enter interview invitation here"
                className="border w-full h-5/6 resize-none overflow-y-auto p-2 focus:outline-none focus:ring-0 border-gray-600"
              />
            </div>
            <div id="Rejection-email" className="grow h-full p-2">
              <label htmlFor="rejectionEmail" className="block text-base mb-2">
                <b>Rejection Email</b>
              </label>
              <textarea
                value={rejectionEmail}
                onChange={(e) => setRejectionEmail(e.target.value)}
                id="rejectionEmail"
                name="rejectionEmail"
                placeholder="Enter rejection email here"
                className="border w-full h-5/6 resize-none overflow-y-auto p-2 focus:outline-none focus:ring-0 border-gray-600"
              />
            </div>
          </div>
          {((rejectionEmail != initRejectionEmail) || (interviewEmail != initInterviewEmail)) && (
          <div className="fixed inset-x-0 bottom-10 flex justify-center">
            <button
              onClick={changesSubmitted}
              type="button"
              className="p-4 border-4 border-purple-300 bg-purple-100 rounded py-1 shadow-lg shadow-purple-300 md:shadow-none"
            >
              Submit Changes
            </button>
          </div>)}
        </section>
      </main>
    </>
  );
}
