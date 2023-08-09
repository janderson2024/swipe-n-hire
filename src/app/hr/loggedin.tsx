"use client";

import NavBar from "@/components/navbar";
import HRProfileImage from "@/components/HRProfileImage";
import Logo from "@/components/Logo";
import JobStatusToggle from "@/components/JobStatusToggle";
import HRJobCard from "@/components/HRJobCard";
import Link from "next/link";
import createNewJob from "@/backend/createNewJob";

import { useState } from "react";

import {HRJobPostingsDB} from "@/types/job";

function CenterTitle() {
  return <span className="text-xl font-bold">Current Postings</span>;
}

function HRJobControls({ job }: { job: HRJobPostingsDB }) {
  const HrLink = "/hr/" + job.Job_ID + "/edit-posting";

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
            href={"/hr/" + job.Job_ID + "/resumes"}
            className="text-violet-600 text-base font-bold lg:text-lg"
          >
            {job.Open_Application_Count} Open Applications
          </Link>
          <span className="text-sm">
            Accepted: {job.Accepted_Application_Count}
          </span>
          <span className="text-sm">
            Rejected: {job.Rejected_Application_Count}
          </span>
        </div>

        <div id="creator-toggle" className="flex flex-col justify-evenly">
          <JobStatusToggle job={job} />
          <span className="text-sm hidden sm:block">
            Created By: {job.Employee_Name}
          </span>
        </div>
      </div>
    </div>
  );
}

interface HRLoggedInProps {
  jobs: HRJobPostingsDB[];
  userId: string;
}

export default function HRLoggedIn({ jobs, userId }: HRLoggedInProps) {
  const [showMyPosts, setShowMyPosts] = useState(true);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowMyPosts(!event.target.checked);
  };

  const [filter, setFilter] = useState(" ");
  const [sorting, setSorting] = useState("id");
  const [filterButton, setFilterButton] = useState(false);

  const toggleFilterButton = () => {
    setFilterButton(!filterButton);
  };

  let processedJobs = jobs;
  //only show mine
  if (showMyPosts) {
    processedJobs = processedJobs.filter((job:any) => {
      return userId == job.HR_Creator_ID?.toString();
    });
  }

  //filter
  if (filterButton) {
    processedJobs = processedJobs.filter((job) => {
      const possibleFilters = [
        job.Job_ID.toString(),
        job.Job_Name,
        job.Employee_Name
      ];
      return possibleFilters.some((possibleFilter) => {
        return possibleFilter?.includes(filter);
      });
    });
  }

  /*console.log(jobs);
  console.log(processedJobs);

  console.log("time to sort");*/
  //sort

  processedJobs = processedJobs.sort((a, b) => {
    if (sorting == "id") {
      return a.Job_ID - b.Job_ID;
    } else if (sorting == "post-date") {
      return Date.parse(b.Job_Date_Posted) - Date.parse(a.Job_Date_Posted);
    } else if (sorting == "title") {
      return a.Job_Name.localeCompare(b.Job_Name);
    } else if (sorting == "creator") {
      return a.Employee_Name.localeCompare(b.Employee_Name);
    } else if (sorting == "unseen-apps") {
      return b.Open_Application_Count - a.Open_Application_Count;
    }
    return a.Job_ID - b.Job_ID;
  });
  //console.log(processedJobs);

  //show jobs

  return (
    <div className="flex flex-col nowrap h-screen">
      <NavBar
        LeftItem={<Logo />}
        CenterItem={<CenterTitle />}
        RightItem={<HRProfileImage />}
      />
      <main className="h-main-under-nav">
        <div
          id="topcontrols"
          className="flex justify-around border-b-2 border-slate-500 p-2 h-1/6"
        >
          <form action={createNewJob}>
            <button className="p-4 border-4 border-slate-700" type="submit">
              + New Posting
            </button>
          </form>

          <label
            htmlFor="toggle-posting"
            className="flex 
        cursor-pointer 
        select-none 
        items-center"
          >
            <span className="pr-2 text-right">Show my postings</span>
            <div className="relative">
              <input
                type="checkbox"
                id="toggle-posting"
                onChange={handleCheckboxChange}
                className="peer sr-only"
              />

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
            <span className="pl-2">Show all postings</span>
          </label>

          <div id="bars" className="flex flex-col">
            <div id="Filter-Bar" className="flex">
              <input
                type="text"
                className="border-2 border-slate-700 m-1"
                placeholder="Job title, Id, status..."
                onChange={(event) => {
                  setFilter(event.target.value);
                }}
              />
              <button
                className={
                  (filterButton &&
                    "bg-slate-500 color-white hover:bg-slate-700") +
                  " border-2 border-slate-700 m-1 hover:bg-slate-300"
                }
                onClick={toggleFilterButton}
              >
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
                  onChange={(e) => setSorting(e.target.value)}
                  defaultValue={sorting}
                >
                  <option value="id">Job Id</option>
                  <option value="post-date">Date posted</option>
                  <option value="title">Title</option>
                  <option value="creator">Creator</option>
                  <option value="unseen-apps">Unseen Applications</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div
          id="jobs"
          className="flex flex-nowrap pb-4 items-center flex-col divide-y-2 divide-slate-500 h-5/6 overflow-y-scroll"
        >
          {processedJobs.length > 0 ?(
          processedJobs.map((job: HRJobPostingsDB) => (
            <HRJobCard key={job.Job_ID} job={job} RightItem={HRJobControls} />
          ))) : (
            <i className="p-4 text-center">No matching openings...</i>
          )}
        </div>
      </main>
    </div>
  );
}
