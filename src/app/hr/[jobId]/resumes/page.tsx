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

export default function ViewResumes() {
    return (
        <div>
            <NavBar
                LeftItem={BackToOpenings}
                RightItem={HRProfileImage}
            />
        <h1> View Resumes </h1>
        </div>
    )
}