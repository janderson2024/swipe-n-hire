"use client";

import getJob from "@/backend/getJob";
import updateApplicantDecision from "@/backend/updateApplicantDecision";
import BackToOpenings from "@/components/BackToOpenings";
import { useEffect, useState } from "react";

export default function ViewResumes({ params }: { params: { jobId: string } }) {
  const [jobTitle, setJobTitle] = useState("");
  const [acceptedCount, setAcceptedCount] = useState(Number);
  const [rejectedCount, setRejectedCount] = useState(Number);
  const [openApplications, setOpenApplications] = useState(Number);

  const getJobData = async () => {
    const findJob = await getJob(params.jobId);
    setJobTitle(findJob.Job_Name);
    setAcceptedCount(findJob.Accepted_Application_Count);
    setRejectedCount(findJob.Rejected_Application_Count);
    setOpenApplications(findJob.Open_Application_Count);
  };

  useEffect(() => {
    getJobData();
  }, []);

  const resumeLink =
    "https://uploadthing.com/f/f9237960-d263-4038-a11d-07d4b7167fef_DennisMBowenResume%20copy.pdf";

  const updateApplicantReject = async () => {
    updateApplicantDecision(params.jobId, false);
  };

  const updateApplicantAccept = async () => {
    updateApplicantDecision(params.jobId, true);
  };

  return (
    <>
      <main className="px-4">
        <div className="flex justify-end">
          <h2 className="text-l block text-center mt-4 mr-4">
            Accepted: {acceptedCount}
          </h2>
        </div>
        <div className="flex justify-end">
          <h2 className="text-l block text-center mt-2 mr-4">
            Rejected: {rejectedCount}
          </h2>
        </div>
        <div className="justify-center">
          <div>
            <h1 className="text-2xl block text-center font-semibold text-purple-700 mt-1">
              {jobTitle}
            </h1>
          </div>
          {/**Will need to updated hardcoded 1*/}
          <div>
            <h2 className="text-l block text-center mt-2">
              1 of {openApplications} Applications
            </h2>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex justify-center mt-5"></div>
          <div className="flex items-center p-4">
            <button
              onClick={updateApplicantReject}
              type="button"
              className="border-purple-700 text-l block text-center"
            >
              Click to Reject
            </button>
          </div>
          <div className="h-96 w-4/5 bg-gray-100 rounded-md">
            <iframe
              className="w-full h-full border-grey-500 border-2 overflow-y-scroll"
              src={resumeLink + "#view=FitH&toolbar=0"}
            ></iframe>
          </div>
          <div className="flex items-center p-4">
            <div>
              <h1 className="text-2xl block text-center"></h1>
            </div>
            <div className="flex items-center p-4">
              <button
                onClick={updateApplicantAccept}
                type="button"
                className="border-purple-700 text-l block text-center"
              >
                Click to Accept
              </button>
            </div>
          </div>
        </div>
        {/** Possible Strtch Goal
        <div className="flex justify-center mt-4">
          <h2 className="text-l block text-center font-semibold text-purple-700">
            View Applicant Information
          </h2>
        </div>
         */}
      </main>
    </>
  );
}
