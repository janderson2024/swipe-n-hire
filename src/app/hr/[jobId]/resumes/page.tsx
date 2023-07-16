import Link from "next/link";
import NavBar from "@/components/navbar"
import HRProfileImage from "@/components/HRProfileImage";
import { getTestJobs, Job } from "@/types/job";

function BackToOpenings() {
    return (
      <Link href="../" className="text-blue-500">
        &lt; back to openings
      </Link>
    );
  }
  function PostingsNavBar() {
    return  (
      <><Link href="/hr/{jobId}/edit-posting">
        Edit Posting
      </Link>
      <Link href="/hr/{jobId}/resumes">
          Resumes
      </Link>
      <Link href="/hr/{jobId}/edit-emails">
        Customize Emails
      </Link>
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
      RightItem={HRProfileImage}/>
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
          <h1 className="text-2xl block text-center font-semibold text-purple-700 mt-1">Position Title</h1>
        </div>
        <div>
          <h2 className="text-l block text-center mt-4">1 of 20 Applications</h2>
        </div>
      </div>
        
    

    </main>

    </>
   



    )
}