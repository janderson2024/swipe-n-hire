"use client";

import { updateJobStatus } from "@/backend/editJobPosting";
import getApplicants from "@/backend/getApplicants";
import getJob from "@/backend/getJob";
import sendEmail from "@/backend/sendEmail";
import updateApplicantDecision from "@/backend/updateApplicantDecision";
import updateApplicantStatus from "@/backend/updateApplicantStatus";
import BackToOpenings from "@/components/BackToOpenings";
import ChrevronRight from "@/components/ChevronRight";
import { ApplicationsForHR } from "@/types/job";
import { open } from "fs/promises";
import { Fascinate_Inline } from "next/font/google";
import { useEffect, useState } from "react";
import ResumeSwiper from "@/components/ResumeSwiper";

export default function ViewResumes({ params }: { params: { jobId: string } }) {
  const [jobTitle, setJobTitle] = useState("");
  const [acceptedCount, setAcceptedCount] = useState(Number);
  const [rejectedCount, setRejectedCount] = useState(Number);
  const [openApplications, setOpenApplications] = useState(Number);
  const [acceptedEmail, setAcceptedEmail] = useState("");
  const [rejectionEmail, setRejectionEmail] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantIndex, setApplicantIndex] = useState(0);
  const [applicantResume, setApplicantResume] = useState("");
  const [applicants, setApplicants] = useState<ApplicationsForHR[]>([]);
  const [currentApplicant, setCurrentApplicant] = useState(Object);
  const [applicantId, setApplicantId] = useState("");
  const [currentResumeIndex, setCurrentResumeIndex] = useState(1);

  useEffect(() => {
    async function fetchInitialApplicants() {
      try {
        const pendingApplicants: ApplicationsForHR[] = await getApplicants(
          params.jobId
        );
        setApplicants(pendingApplicants);
      } catch (error) {
        console.error("Error fetching applicants", error);
      }
    }
    fetchInitialApplicants();
  }, []);

  const checkApplicantIndex = async () => {
    if (applicantIndex == applicants.length - 1) {
      setApplicantIndex(applicantIndex - 1);
    }
  };

  const checkCurrentResumeIndex = async () => {
    if (currentResumeIndex == applicants.length) {
      setCurrentResumeIndex(currentResumeIndex - 1);
    }
  };

  const getCurrentApplicant = async () => {
    setCurrentApplicant(
      Object.assign(currentApplicant, applicants[applicantIndex])
    );
    setApplicantResume(currentApplicant.Applicant_Resume);
    setApplicantEmail(currentApplicant.Applicant_Email);
    setApplicantId(currentApplicant.Application_ID);
  };

  const getUpdatedApplicantList = async () => {
    const pendingApplicants: ApplicationsForHR[] = await getApplicants(
      params.jobId
    );
    setApplicants(pendingApplicants);
  };

  const getHRJobData = async () => {
    const findJob = await getJob(params.jobId);
    setJobTitle(findJob.Job_Name);
    setAcceptedCount(findJob.Accepted_Application_Count);
    setRejectedCount(findJob.Rejected_Application_Count);
    setOpenApplications(findJob.Open_Application_Count);
    setAcceptedEmail(findJob.Job_Accepted_Email);
    setRejectionEmail(findJob.Job_Rejected_Email);
  };

  useEffect(() => {
    getHRJobData();
    getCurrentApplicant();
  });

  function updateResumePage() {
    getUpdatedApplicantList();
    getCurrentApplicant();
  }

  function previousApplicant() {
    if (applicantIndex > 0) {
      setApplicantIndex(applicantIndex - 1);
      setCurrentResumeIndex(currentResumeIndex - 1);
    }
    console.log(applicantIndex);
  }

  function nextApplicant() {
    if (applicantIndex + 1 < applicants.length) {
      setApplicantIndex(applicantIndex + 1);
      setCurrentResumeIndex(currentResumeIndex + 1);
    }
    getCurrentApplicant;
  }

  //Hard-coded resume
  /*const resumeLink =
    "https://uploadthing.com/f/f9237960-d263-4038-a11d-07d4b7167fef_DennisMBowenResume%20copy.pdf";*/

  const updateApplicantReject = async () => {
    updateApplicantDecision(params.jobId, false);
    updateApplicantStatus(applicantId, "Rejected");
    //Email functionality works... commenting out to reduce emails while testing
    await sendEmail(
      applicantEmail,
      `Re: Your application for ${jobTitle}`,
      rejectionEmail
    );
    checkApplicantIndex();
    checkCurrentResumeIndex();
    updateResumePage();
  };

  const updateApplicantAccept = async () => {
    updateApplicantDecision(params.jobId, true);
    updateApplicantStatus(applicantId, "Accepted");
    //Email functionality works... commenting out to reduce emails while testing
    await sendEmail(
      applicantEmail,
      `Re: Your application for ${jobTitle}`,
      acceptedEmail
    );
    checkApplicantIndex();
    checkCurrentResumeIndex();
    updateResumePage();
  };

  return (
    <>
      <main className="h-main-under-nav px-4">
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
          <div className="flex justify-center space-x-10">
            <button
              type="button"
              onClick={previousApplicant}
              className="justify-center w-40 border-2 border-black text-purple-700 py-1"
            >
              Previous Applicant
            </button>
            <h2 className="text-l block text-center mt-2">
              {currentResumeIndex} of {openApplications} Applications
            </h2>
            <button
              type="button"
              onClick={nextApplicant}
              className="justify-center w-40 border-2 border-black text-purple-700 py-1"
            >
              Next Applicant
            </button>
          </div>
          {/** Application Index being displayed for testing
          <div>
            <h2 className="text-l block text-center mt-2">
              Application Index: {applicantIndex}
            </h2>
          </div>
          */}
        </div>
        <div id="resumeHolder" className="w-full h-4/6 justify-center mt-4">
          <ResumeSwiper
            resumeLink={applicantResume}
            acceptFunction={updateApplicantAccept}
            rejectFunction={updateApplicantReject}
          />
        </div>
        {/** 
        <div>
          <button
            onClick={nextApplicant}
            type="button"
            className="border-purple-700 text-l block text-center"
          >
            Next Applicant
          </button>
          <button
            onClick={previousApplicant}
            type="button"
            className="border-purple-700 text-l block text-center"
          >
            Previous Applicant
          </button>
        </div>
        */}

        {/** Possible Stretch Goal
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
