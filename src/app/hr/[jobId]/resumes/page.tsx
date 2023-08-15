"use client";

import getApplicants from "@/backend/getApplicants";
import getJob from "@/backend/getJob";
import sendEmail from "@/backend/sendEmail";
import updateApplicantDecision from "@/backend/updateApplicantDecision";
import updateApplicantStatus from "@/backend/updateApplicantStatus";
import { ApplicationsForHR } from "@/types/job";
import { useEffect, useState } from "react";
import ResumeSwiper from "@/components/ResumeSwiper";
import PostingsNavBar from "@/components/PostingsNavBar";
import { useRouter } from "next/navigation";

export default function ViewResumes({ params }: { params: { jobId: string } }) {
  const [jobTitle, setJobTitle] = useState("");
  const [acceptedCount, setAcceptedCount] = useState(Number);
  const [rejectedCount, setRejectedCount] = useState(Number);
  const [pendingApplicantCount, setPendingApplicantCount] = useState(Number);
  const [acceptedEmail, setAcceptedEmail] = useState("");
  const [rejectionEmail, setRejectionEmail] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantIndex, setApplicantIndex] = useState(0);
  const [applicantResume, setApplicantResume] = useState("");
  const [applicants, setApplicants] = useState<ApplicationsForHR[]>([]);
  const [currentApplicant, setCurrentApplicant] = useState(Object);
  const [applicantId, setApplicantId] = useState("");
  const [currentResumeIndex, setCurrentResumeIndex] = useState(0);
  const [openApplicationCount, setOpenApplicationCount] = useState(Number);
  const router = useRouter();

  useEffect(() => {
    async function fetchInitialApplicants() {
      try {
        const currentPendingApplicants: ApplicationsForHR[] =
          await getApplicants(params.jobId);
        setApplicants(currentPendingApplicants);
      } catch (error) {
        console.error("Error fetching applicants", error);
      }
    }
    fetchInitialApplicants();
  }, []);

  const findOpenApplications = async () => {
    const findJobOpenings = await getJob(params.jobId);
    setOpenApplicationCount(findJobOpenings.Open_Application_Count);
  };

  useEffect(() => {
    findOpenApplications();
  }, []);

  useEffect(() => {
    if (openApplicationCount > 0) {
      setCurrentResumeIndex(1);
    }
  }, [openApplicationCount]);

  const getHRJobData = async () => {
    const findJob = await getJob(params.jobId);
    setJobTitle(findJob.Job_Name);
    setAcceptedCount(findJob.Accepted_Application_Count);
    setRejectedCount(findJob.Rejected_Application_Count);
    setAcceptedEmail(findJob.Job_Accepted_Email);
    setRejectionEmail(findJob.Job_Rejected_Email);
    setPendingApplicantCount(applicants.length);
  };

  useEffect(() => {
    getCurrentApplicant();
    getHRJobData();
  });

  const getCurrentApplicant = async () => {
    setCurrentApplicant(
      Object.assign(currentApplicant, applicants[applicantIndex])
    );
    setApplicantResume(currentApplicant.Applicant_Resume);
    setApplicantEmail(currentApplicant.Applicant_Email);
    setApplicantId(currentApplicant.Application_ID);
  };

  const checkApplicantIndex = async () => {
    if (applicantIndex == applicants.length - 1) {
      setApplicantIndex(applicantIndex - 1);
    }
  };

  const getUpdatedApplicantList = async () => {
    const pendingApplicants: ApplicationsForHR[] = await getApplicants(
      params.jobId
    );
    let listLength = pendingApplicants.length;
    if (listLength == 0) {
      alert("A decision has been made on all pending applications.");
      router.push("/hr");
    }
    setApplicants(pendingApplicants);
  };

  function updateResumePage() {
    checkCurrentResumeIndex();
    getUpdatedApplicantList();
    getCurrentApplicant();
  }

  function checkCurrentResumeIndex() {
    let openApplications = applicants.length;
    if (openApplications == 0) {
      setCurrentResumeIndex(0);
    } else if (currentResumeIndex == openApplications) {
      setCurrentResumeIndex(currentResumeIndex - 1);
    }
  }

  function previousApplicant() {
    if (applicantIndex > 0) {
      setApplicantIndex(applicantIndex - 1);
      setCurrentResumeIndex(currentResumeIndex - 1);
    }
  }

  function nextApplicant() {
    if (applicantIndex + 1 < applicants.length) {
      setApplicantIndex(applicantIndex + 1);
      setCurrentResumeIndex(currentResumeIndex + 1);
    }
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
    updateResumePage();
  };

  return (
    <>
      <PostingsNavBar jobId={params.jobId} segment="resumes" />
      <main className="h-main-under-nav p-4">
        <div>
          <h1 className="text-2xl font-bold text-center">{jobTitle}</h1>
          <hr className="mt-3"></hr>
        </div>
        <div className="grid grid-cols-3 w-full border-b border-purple-700">
          <div className="col-start-2 self-center">
            <div className="flex justify-center space-x-4 mt-2">
              <button
                type="button"
                onClick={previousApplicant}
                className="text-purple-700 hover:text-purple-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <h2 className="text-l block text-center">
                {currentResumeIndex} of {pendingApplicantCount} Applications
              </h2>
              <button
                type="button"
                onClick={nextApplicant}
                className=" text-purple-700 hover:text-purple-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div id="count-wrapper" className="justify-self-end my-2 mr-4">
            <h2 className="text-l block text-center">
              Accepted: {acceptedCount}
            </h2>
            <h2 className="text-l block text-center">
              Rejected: {rejectedCount}
            </h2>
          </div>
        </div>
        <div id="resumeHolder" className="w-full h-5/6 justify-center">
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
