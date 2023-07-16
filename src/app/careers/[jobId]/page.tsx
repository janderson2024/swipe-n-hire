{/*export default function JobDescription({
  params,
}: {
  params: { jobId: string };
}) {
    console.log(params);
  return <div>JOB: {params.jobId}</div>;
} */}

import NavBar from "@/components/navbar";
import Logo from "@/components/Logo";
import Link from "next/link";
import { getTestJobs, Job } from "@/types/job";

function JobPosting({ job }: {job:Job}) {
  return (
    <div className="border-b py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <div className="text-s text-gray-4 m-4">ID: {job.JobID}</div>
          <Link
            href={`/job-description/${job.JobID}`}
            className="text-blue-500 text-lg font-bold m-4"
          >
            {job.JobTitle}
          </Link>
          <div className="text-gray-600 ml-4">Posted {job.JobDate}</div>
        </div>
        <div className="flex flex-wrap justify-between md:flex-row md:gap-2 m-4">

          <div className="flex items-center">
            <div className="bg-gray-300 p-2 rounded-full">
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
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
            </div>
            <div className="ml-2">{job.JobEmployment}</div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-300 p-2 rounded-full">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <div className="ml-2">{job.JobLocation}</div>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-300 p-2 rounded-full">
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
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div className="ml-2">{job.JobDepartment}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*const jobPostings = [
  {
    id: "123",
    jobTitle: "Software Engineer",
    postedDate: "July 15, 2023",
    employmentType: "Full-time",
    location: "San Francisco, CA",
    department: "Engineering",
  },
  {
    id: "124",
    jobTitle: "Product Manager",
    postedDate: "July 16, 2023",
    employmentType: "Full-time",
    location: "New York, NY",
    department: "Product",
  },
  {
    id: "125",
    jobTitle: "UX Designer",
    postedDate: "July 17, 2023",
    employmentType: "Contract",
    location: "Los Angeles, CA",
    department: "Design",
  },
  {
    id: "126",
    jobTitle: "Data Scientist",
    postedDate: "July 18, 2023",
    employmentType: "Full-time",
    location: "Chicago, IL",
    department: "Data Science",
  },
  {
    id: "127",
    jobTitle: "Marketing Specialist",
    postedDate: "July 19, 2023",
    employmentType: "Part-time",
    location: "Seattle, WA",
    department: "Marketing",
  },
];*/

export default function JobPostings() {
  return (
    <>
      <NavBar LeftItem={Logo} />
      <main className="p-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Current Openings</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border p-2 rounded-l-md focus:outline-none w-full"
            />
            <button className="bg-gray-200 p-2 rounded-r-md focus:outline-none">
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
        </div>
        <div className="mt-8 border border-black rounded">
          {getTestJobs().map((job) => (
            <JobPosting key={job.JobID} job={job} />
          ))}
        </div>
      </main>
    </>
  );
}
