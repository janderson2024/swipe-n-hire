import Link from "next/link";
import NavBar from "@/components/navbar";
import HRProfileImage from "@/components/HRProfileImage";
import { getTestJobs, Job } from "@/types/job";
import BackToOpenings from "@/components/BackToOpenings";

function PostingsNavBar() {
  return (
    <>
      <Link href="/hr/{jobId}/edit-posting">Edit Posting</Link>
      <Link href="/hr/{jobId}/resumes">Resumes</Link>
      <Link href="/hr/{jobId}/edit-emails">Customize Emails</Link>
    </>
  );
}

export default function ViewResumes() {
  return (
    <>
      <div>
        <NavBar
          LeftItem={BackToOpenings}
          CenterItem={PostingsNavBar}
          RightItem={HRProfileImage}
        />
      </div>

      <main className="px-4">
        <div className="flex justify-end">
          <h2 className="text-l block text-center mt-4 mr-4">Accepted: 5</h2>
        </div>
        <div className="flex justify-end">
          <h2 className="text-l block text-center mt-2 mr-4">Rejected: 10</h2>
        </div>

        <div className="justify-center">
          <div>
            <h1 className="text-2xl block text-center font-semibold text-purple-700 mt-1">
              Position Title
            </h1>
          </div>
          <div>
            <h2 className="text-l block text-center mt-2">
              1 of 20 Applications
            </h2>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="flex items-center p-4">
            <h2 className="text-l block text-center">Swipe to Reject</h2>
          </div>
          <div className="flex h-96 w-4/5 bg-gray-100 rounded-md"></div>
          <div className="flex items-center p-4">
            <div>
              <h1 className="text-2xl block text-center"></h1>
            </div>
            <h2 className="text-l block text-center">Swipe to Accept</h2>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <h2 className="text-l block text-center font-semibold text-purple-700">
            View Applicant Information
          </h2>
        </div>
      </main>
    </>
  );
}
