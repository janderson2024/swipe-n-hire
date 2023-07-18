import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import NavBar from "@/components/navbar";
import HRProfileImage from "@/components/HRProfileImage";
import Logo from "@/components/Logo";
import JobStatusToggle from "@/components/JobStatusToggle";
import JobCard from "@/components/JobCard";
import Link from "next/link";

import { getTestJobs, Job } from "@/types/job";

async function getUser() {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");
  console.log(userID);
  return userID;
}

function CenterTitle() {
  return <span className="text-xl font-bold">Current Postings</span>;
}

function ToggleSwitch() {
  return (
    <label
      htmlFor="toggle-posting"
      className="flex 
      cursor-pointer 
      select-none 
      items-center"
    >
      <span className="pr-2">Show all postings</span>
      <div className="relative">
        <input type="checkbox" id="toggle-posting" className="peer sr-only" />

        <div
          className="box block 
        h-8 w-14 
        rounded-full 
        bg-slate-400
        peer-checked:bg-green-500"
        ></div>

        <div
          className="dot 
        absolute left-1 top-1 
        flex items-center justify-center 
        h-6 w-6 
        rounded-full 
        bg-white
        transition 
        peer-checked:translate-x-full"
        ></div>
      </div>
    </label>
  );
}

function HRJobControls({ job }: { job: Job }) {
  const HrLink = "/hr/" + job.JobID + "/edit-posting";

  return (
    <div className="flex flex-row-reverse">
      <Link
        href={HrLink}
        className="self-center mr-6 p-2 ml-8 rounded-full border-slate-500 border-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 sm:w-10 sm:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </Link>
      <div id="non-edit" className="flex justify-around grow md:grow-[0.5]">
        <div
          id="App-Counts"
          className="flex flex-col justify-self-center hidden sm:flex"
        >
          <Link
            href={"/hr/" + job.JobID + "/resumes"}
            className="text-violet-600 text-base font-bold underline lg:text-lg"
          >
            {job.JobOpenApplications} Open Applications
          </Link>
          <span className="text-sm">
            Accpted: {job.JobAcceptedApplications}
          </span>
          <span className="text-sm">
            Rejected: {job.JobRejectedApplications}
          </span>
        </div>

        <div id="creator-toggle" className="flex flex-col justify-evenly">
          <JobStatusToggle job={job} />
          <span className="text-sm hidden sm:block">
            Created By: {job.JobCreator}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function HRJobPostings() {
  const user = await getUser();
  if (!user) {
    redirect("/hr/login");
  }

  const jobs = getTestJobs();
  var testJob = structuredClone(jobs[0]);
  testJob.JobID = -1;
  return (
    <>
      <NavBar
        LeftItem={Logo}
        CenterItem={CenterTitle}
        RightItem={HRProfileImage}
      />
      <main>
        <div
          id="topcontrols"
          className="flex justify-around border-b-2 border-slate-500 p-2"
        >
          <button className="p-4 border-4 border-slate-700">
            + New Posting
          </button>

          <ToggleSwitch />

          <div id="bars" className="flex flex-col">
            <div id="Filter-Bar" className="flex">
              <input
                type="text"
                className="border-2 border-slate-700 m-1"
                placeholder="Job title, Id, status..."
              />
              <button className="border-2 border-slate-700 m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
              </button>
            </div>

            <div id="sorting-input" className="flex">
              <div className="border-2 border-slate-600">
                <label htmlFor="sorting-select">Sort By: </label>
                <select
                  name="sorting"
                  id="sorting-select"
                  className="outline-none"
                >
                  <option value="post-date">Date posted</option>
                  <option value="title">Title</option>
                  <option value="creator">Creator</option>
                  <option value="unseen-apps">Unseen Applications</option>
                  <option value="status">Application Status</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div
          id="jobs"
          className="flex flex-wrap flex-col content-center mt-5 divide-y-4 divide-slate-600"
        >
          {jobs.map((job: Job) => (
            <JobCard key={job.JobID} job={job} RightItem={HRJobControls} />
          ))}
        </div>
      </main>
    </>
  );
}
