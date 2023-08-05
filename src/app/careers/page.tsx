"use client";
import NavBar from "@/components/navbar";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { JobDb } from "@/types/job";
import ApplicantJobPostings from "@/backend/JobsDb";
import JobPosting from "@/components/JobPosting";

export default function JobPostings() {
  const [jobs, setJobs] = useState<JobDb[]>([]);
  const [filter, setFilter] = useState(" ");
  const [filterButton, setFilterButton] = useState(false);

  const toggleFilterButton = () => {
    setFilterButton(!filterButton);
  };

  let processedJobs = jobs;

  if (filterButton) {
    processedJobs = processedJobs.filter((job) => {
      const possibleFilters = [job.Job_ID.toString(), job.Job_Name];
      return possibleFilters.some((possibleFilter) => {
        return possibleFilter?.includes(filter);
      });
    });
  }

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobsFromDB: JobDb[] = await ApplicantJobPostings();
        setJobs(jobsFromDB);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const possibleFilters = [job.Job_ID.toString(), job.Job_Name];
    return possibleFilters.some((possibleFilter) =>
      possibleFilter.includes(filter)
    );
  });

  return (
    <>
      <NavBar LeftItem={<Logo />} />
      <main className="p-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Current Openings</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded-l-md focus:outline-none w-full"
              value={filter} 
              onChange={(event) => {
                setFilter(event.target.value);
              }}
            />
            <button className="bg-gray-200 p-2 rounded-r-md focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={toggleFilterButton}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-8 border border-black rounded">
          {filteredJobs.length === 0 ? ( 
            <p className="p-4 text-center">No postings</p>
          ) : (
            filteredJobs.map((job) => <JobPosting key={job.Job_ID} job={job} />)
          )}
        </div>
      </main>
    </>
  );
}
