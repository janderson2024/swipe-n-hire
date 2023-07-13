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

export default function EditPosting() {
    return (
        <div>
            <NavBar
              LeftItem={BackToOpenings}
              RightItem={HRProfileImage}
            />
        <h1> Edit Job Posting Details </h1>
        </div>
    )
}