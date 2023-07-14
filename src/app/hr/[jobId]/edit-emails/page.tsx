import Link from "next/link";
import NavBar from "@/components/navbar"
import HRProfileImage from "@/components/HRProfileImage";

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

export default function EditEmails() {
    return (
        <div>
            <NavBar
                LeftItem={BackToOpenings}
                CenterItem={PostingsNavBar}
                RightItem={HRProfileImage}
            />
        <h1> Edit Email Details </h1>
        </div>
    )
}