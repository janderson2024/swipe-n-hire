"use client";

import { useEffect, useState } from "react";
import updateHRjobPosting from "@/backend/updateHRJobPosting";
import getJob from "@/backend/getJob";
import { JobDb } from "@/types/job";

export default function EditPosting({ params }: { params: { jobId: string } }) {
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [emplType, setEmplType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const getJobData = async () => {
    const findJob = await getJob(params.jobId);
    setDepartment(findJob.Job_Department);
    setEmplType(findJob.Job_Employment_Type);
    setSalaryRange(findJob.Job_Salary);
    setLocation(findJob.Job_Location);
    setJobDescription(findJob.Job_Description);
  };

  useEffect(() => {
    getJobData();
  }, []);

  async function changesSubmitted() {
    await updateHRjobPosting(
      params.jobId,
      jobTitle,
      department,
      emplType,
      salaryRange,
      location,
      jobDescription
    );
    alert("Your job posting has been saved!");
  }

  return (
    <>
      <main>
        <div>
          <h1 className="text-2xl block text-center font-semibold text-purple-700 mt-4">
            Add/Edit Job Posting
          </h1>
          <hr className="mt-4"></hr>
        </div>

        <div>
          <div className="flex justify-around py-5">
            <div>
              <div className="py-6">
                <h2 className="text-lxl block text-left font-semibold text-black">
                  Job ID: {params.jobId}
                </h2>
              </div>
              <div className="py-2">
                <label
                  htmlFor="emplType"
                  className="block text-base text-purple-700 mb-2"
                >
                  Employment Type:
                </label>
                <input
                  value={emplType}
                  onChange={(e) => setEmplType(e.target.value)}
                  type="text"
                  placeholder="Employment Type"
                  id="emplType"
                  name="emplType"
                  className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
                />
              </div>
            </div>

            <div>
              <div className="py-1">
                <label
                  htmlFor="jobTitle"
                  className="block text-base text-purple-700 mb-2"
                >
                  Job Title:
                </label>
                <input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Job Title"
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  className="border w-4/5 text-base px-2 py-1 border-gray-600"
                />
              </div>

              <div className="py-2">
                <label
                  htmlFor="salaryRange"
                  className="block text-base text-purple-700 mb-2"
                >
                  Salary Range:
                </label>
                <input
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  type="text"
                  placeholder="Salary Range"
                  id="salaryRange"
                  name="salaryRange"
                  className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
                />
              </div>
            </div>

            <div>
              <div className="py-1">
                <label
                  htmlFor="department"
                  className="block text-base text-purple-700 mb-2"
                >
                  Department:
                </label>
                <input
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  type="text"
                  placeholder="Department"
                  id="department"
                  name="department"
                  className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
                />
              </div>

              <div className="py-2">
                <label
                  htmlFor="location"
                  className="block text-base text-purple-700 mb-2"
                >
                  Location:
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Location"
                  id="location"
                  name="location"
                  className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
                />
              </div>
            </div>

            <div>
              <div className="py-2">
                <button
                  type="button"
                  className="w-full border-2 border-purple-700 bg-purple-700 text-white px-2 py-1"
                >
                  Position Filled
                </button>
              </div>

              <div className="py-2">
                {/* Toggle Button Here*/}
                <button
                  type="button"
                  className="w-full border-2 border-purple-700 bg-purple-700 text-white px-3 py-1"
                >
                  Toggle
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center px-5 py-4">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              id="jobDescription"
              name="jobDescription"
              placeholder="Enter job description here"
              rows={8}
              className="border w-4/5 text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={changesSubmitted}
              className="justify-center w-40 border-2 border-purple-700 bg-purple-700 text-white py-1"
            >
              Save Posting
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

function getJobPosting(posting_id: string) {
  throw new Error("Function not implemented.");
}
