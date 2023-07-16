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
        <div>
            <NavBar
                LeftItem={BackToOpenings}
                CenterItem={PostingsNavBar}
                RightItem={HRProfileImage}
            />
        <h1> View Resumes </h1>
        </div>
    )
}