import Link from "next/link";
import NavBar from "./navbar";
import BackToOpenings from "./BackToOpenings";
import HRProfileImage from "./HRProfileImage";

interface PostingsNavBarProps {
  jobId: string;
  segment: string;
}

export default function PostingsNavBar({
  jobId,
  segment,
}: PostingsNavBarProps) {
  return (
    <NavBar
      LeftItem={BackToOpenings("/hr")}
      CenterItem={PostingsNavBarCenter(jobId, segment)}
      RightItem={<HRProfileImage />}
    />
  );
}

function PostingsNavBarCenter(jobId: string, segment: string) {
  const active = "p-2 bg-purple-500 rounded border border-purple-900";
  const editPosting = segment == "edit-posting" ? active : "";
  const resumes = segment == "resumes" ? active : "";
  const editEmails = segment == "edit-emails" ? active : "";

  return (
    <>
      <Link
        href={`/hr/${jobId}/edit-posting`}
        className={"text-white hover:underline " + editPosting}
      >
        Edit Posting
      </Link>
      <Link
        href={`/hr/${jobId}/resumes`}
        className={"text-white hover:underline " + resumes}
      >
        Resumes
      </Link>
      <Link
        href={`/hr/${jobId}/edit-emails`}
        className={"text-white hover:underline " + editEmails}
      >
        Customize Emails
      </Link>
    </>
  );
}
