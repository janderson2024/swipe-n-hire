import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import NavBar from "@/components/navbar";
import Link from "next/link";
import HRProfileImage from "@/components/HRProfileImage";
import Logo from "@/components/Logo";

async function getUser() {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");
  console.log(userID);
  return userID;
}

function CenterTitle() {
  return <span className="text-xl font-bold">Current Postings</span>;
}

function BackToOpenings() {
  return (
    <Link href="/careers" className="text-blue-500">
      &lt; back to openings
    </Link>
  );
}

export default async function HRJobPostings() {
  const user = await getUser();
  if (!user) {
    redirect("/hr/login");
  }
  return (
    <>
      <NavBar
        LeftItem={Logo}
        CenterItem={CenterTitle}
        RightItem={HRProfileImage}
      />
      <h1>logged in</h1>
    </>
  );
}
