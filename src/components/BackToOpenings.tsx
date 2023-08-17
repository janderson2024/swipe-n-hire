import Link from "next/link";
import BackArrow from "@/components/BackArrow";

export default function BackToOpenings(backLink: string) {
  return (
    <Link
      href={backLink}
      className="text-white font-semibold flex items-center hover:underline"
    >
      <BackArrow />
      <span className="hidden md:inline">
      Back to Openings
      </span>
      <span className="md:hidden">
        Back
      </span>
    </Link>
  );
}
