"use client";

import Link from "next/link";
import Modal from "@/components/Modal";
import ShareModal from "@/components/ShareModal";
import { useState } from "react";
import { JobDb } from "@/types/job";

function JobDescription({ job }: { job: JobDb }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const postLink = window.location.href;

  function openShareModal() {
    setShowShareModal(true);
  }

  function closeShareModal() {
    setShowShareModal(false);
  }

  return (
    <>
      <main className="flex flex-col items-center bg-green-300 justify-center">
        <h1 className="text-lg font-bold mt-4">
          {job.Job_Name} - Job ID: {job.Job_ID}
        </h1>
        <div className="w-full md:w-2/3 bg-blue-400 flex justify-between mb-4 px-6 lg:flex flex-wrap">
          <div className="text-left">
            <p>
              <b>Department:</b> {job.Job_Department}
            </p>
            <p>
              <b>Employment Type:</b> {job.Job_Employment_Type}
            </p>
          </div>
          <div className="text-right bg-purple-500">
            <p>
              <b>Salary Range:</b> {job.Job_Salary}
            </p>
            <p className="text-left">
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
          rows={16}
          className="resize-none mb-4 overflow-y-auto border rounded w-2/3 text-base px-2 py-1 border-purple-600 focus:outline-0"
        />
        <div className="flex w-3/5 justify-evenly lg:flex flex-wrap">
          <Link className="mr-4" href={`/careers/${job.Job_ID}/apply`}>
            <button className="bg-purple-700 hover:bg-purple-500 w-48 text-white font-bold py-2 px-4 rounded">
              Apply for this Job
            </button>
          </Link>
          <button
            onClick={openShareModal}
            className="bg-purple-700 hover:bg-purple-500 w-48 text-white font-bold py-2 px-4 rounded"
          >
            Share this Job
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
