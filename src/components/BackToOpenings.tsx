import Link from "next/link";
import BackArrow from "@/components/BackArrow";

export default function BackToOpenings() {
    return (
      <Link href="/careers" className="text-blue-500 flex items-center">
        <BackArrow/>
        Back to Openings
      </Link>
    );
  }