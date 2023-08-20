"use client";
import NavBar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { JobDb } from "@/types/job";
import ApplicantJobPostings from "@/backend/JobsDb";
import JobPosting from "@/components/JobPosting";
import Link from "next/link";

export default function JobPostings() {
  const [jobs, setJobs] = useState<JobDb[]>([]);
  const [filter, setFilter] = useState("");
  const [filterButton, setFilterButton] = useState(false);

  const toggleFilterButton = () => {
    setFilterButton(!filterButton);
  };

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
    const possibleFilters = [
      job.Job_ID.toString(),
      job.Job_Name,
      job.Job_Location,
      job.Job_Employment_Type,
    ];
    return possibleFilters.some(
      (possibleFilter: any) => possibleFilter && possibleFilter.includes(filter)
    );
  });

  return (
    <>
      <NavBar
        LeftItem={<Logo />}
        RightItem={
          <div className="flex items-center">
            <Link
              href="/about"
              className="flex items-center text-white font-semibold hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
              About
            </Link>
          </div>
        }
      />
      <main className="p-8">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 md:mb-0 md:mr-8">
            Current Openings
          </h1>
          <div className="flex items-center w-full md:w-1/3 justify-end">
            <input
              type="text"
              placeholder="Job Title, Location, Status, or ID"
              className="border p-2 rounded-l-md focus:outline-none w-full"
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="bg-gray-200 p-2 rounded-r-md focus:outline-none w-10 h-10"
              onClick={toggleFilterButton}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-8 border border-black rounded">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobPosting key={job.Job_ID} job={job} />)
          ) : (
            <p className="p-4 text-center">No openings</p>
          )}
        </div>
      </main>
    </>
  );
}
