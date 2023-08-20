"use client";

import { useEffect, useState } from "react";
import updateHRjobPosting from "@/backend/updateHRJobPosting";
import getJob from "@/backend/getJob";
import JobStatusToggle from "@/components/JobStatusToggle";
import { JobDb } from "@/types/job";
import updateJobStatusDB from "@/backend/updateJobStatusDB";
import PostingsNavBar from "@/components/PostingsNavBar";

export default function EditPosting({ params }: { params: { jobId: string } }) {
  const [job, setJob] = useState<JobDb>();
  const [jobTitle, setJobTitle] = useState("");
  const [staticJobTitle, setStaticJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [emplType, setEmplType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobFilled, setFilled] = useState("filled");

  const getJobData = async () => {
    const findJob = await getJob(params.jobId);
    setJob(findJob);
    setJobTitle(findJob.Job_Name);
    setDepartment(findJob.Job_Department);
    setEmplType(findJob.Job_Employment_Type);
    setSalaryRange(findJob.Job_Salary);
    setLocation(findJob.Job_Location);
    setJobDescription(findJob.Job_Description);
    setStaticJobTitle(findJob.Job_Name);
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
    setStaticJobTitle(jobTitle);
    alert("Your job posting has been saved!");
  }

  async function positionFilled() {
    updateJobStatusDB(params.jobId, jobFilled);
    alert("The position has been filled!");
  }

  return (
    <>
      <PostingsNavBar jobId={params.jobId} segment="edit-posting" />
      <main className="h-main-under-nav p-4">
        <div>
          <h1 className="text-2xl font-bold text-center">{jobTitle}</h1>
          <hr className="mt-3"></hr>
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
                  onClick={positionFilled}
                  className="p-4 border-4 border-purple-300 bg-purple-100 hover:bg-purple-200 rounded px-2 py-1"
                >
                  Position Filled
                </button>
              </div>

              <div className="py-2">
                {/* Toggle Button Here*/}
                <JobStatusToggle job={job} />
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
              className="justify-center p-4 border-4 border-purple-300 bg-purple-100 hover:bg-purple-200 rounded py-1"
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
