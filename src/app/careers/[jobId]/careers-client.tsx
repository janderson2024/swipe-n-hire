"use client";

import Link from "next/link";
import Modal from "@/components/Modal";
import ShareModal from "@/components/ShareModal";
import { useEffect, useState } from "react";
import { JobDb } from "@/types/job";

function JobDescription({ job }: { job: JobDb }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [postLink, setPostLink] = useState("");

  useEffect(()=>{
    setPostLink(window.location.href);
  },[]);

  function openShareModal() {
    setShowShareModal(true);
  }

  function closeShareModal() {
    setShowShareModal(false);
  }

  return (
    <>
      <main className="h-main-under-nav flex flex-col items-center">
        <h1 className="text-lg pb-4 font-bold mt-4">
          {job.Job_Name} - Job ID: {job.Job_ID}
        </h1>
        <div className="w-full md:w-2/3 justify-between mb-4 md:flex md:justify-between">
          <div className="text-center md:text-left">
            <p>
              <b>Department:</b> {job.Job_Department}
            </p>
            <p>
              <b>Employment Type:</b> {job.Job_Employment_Type}
            </p>
          </div>
          <div className="text-center md:text-right">
            <p>
              <b>Salary Range:</b> {job.Job_Salary}
            </p>
            <p>
              <b>Location:</b> {job.Job_Location}
            </p>
          </div>
        </div>

        <textarea
          value={job.Job_Description}
          id="jobDescription"
          name="jobDescription"
          placeholder="Enter job description here"
          readOnly={true}
          className="h-1/2 md:h-4/6 resize-none overflow-y-auto border rounded w-2/3 text-base px-2 py-1 border-purple-600 focus:outline-0"
        />

        <div className="flex w-2/5 mt-2 justify-evenly">
          <Link className="mr-4" href={`/careers/${job.Job_ID}/apply`}>
            <button className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-8 rounded">
              <span>Apply <span className="hidden lg:inline">for this Job</span></span>
            </button>
          </Link>
          <button
            onClick={openShareModal}
            className="bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-8 rounded"
          >
            <span>Share <span className="hidden lg:inline">this Job</span></span>
          </button>
        </div>
        <Modal show={showShareModal} onClose={closeShareModal}>
          <ShareModal link={postLink} />
        </Modal>
      </main>
    </>
  );
}

export default JobDescription;
