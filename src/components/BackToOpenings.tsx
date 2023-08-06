import Link from "next/link";
import BackArrow from "@/components/BackArrow";

export default function BackToOpenings(backLink: string) {
    return (
      <Link href={backLink} className="text-purple-700 flex items-center">
        <BackArrow/>
        Back to Openings
      </Link>
    );
  }