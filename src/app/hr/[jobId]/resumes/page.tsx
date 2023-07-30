import { getTestJobs, Job } from "@/types/job";
import BackToOpenings from "@/components/BackToOpenings";

export default function ViewResumes() {
  const resumeLink = "https://uploadthing.com/f/d2f9819d-1368-4fff-bbcb-a84a3f943de4_updated_resume.pdf";
  return (
    <>
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
          <div className="h-96 w-4/5 bg-gray-100 rounded-md">
          <iframe className="w-full h-full border-grey-500 border-2 overflow-y-scroll" src={resumeLink + '#view=FitH&toolbar=0'}></iframe>
          </div>
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
