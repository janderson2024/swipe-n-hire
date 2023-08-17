import NavBar from "@/components/navbar";
import Logo, { getCompanyName } from "@/components/Logo";
import BackToOpenings from "@/components/BackToOpenings";
import { isJobOpen } from "@/backend/checkJobStatus";
import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { jobId: string }
}
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  
  //console.log(params.jobId);

  //get job name and description from db

  const company_name = getCompanyName();

  const title = company_name + " | Job Name"
  const description = "This is specific for the thing...";
 
  return {
    title: title,
    description: description,
    authors: [{ name: 'Monica Tuttle'}, { name: 'Dennis Bowen'}, {name: 'Joshua Anderson'}],
    openGraph: {
      title: title,
      description: description,
      url: "https://swipe-n-hire.com",
      images: [
        {url: '/icon.png',
        width:192,
        height:192}
      ],
      locale:"en-US",
      type:"website",
    }
  }
}

export default async function HRJobsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { jobId: string };
}) {
  if (await isJobOpen(params.jobId)) {
    return (
      <>
        <NavBar LeftItem={<Logo />} RightItem={BackToOpenings("/careers")} />
        {children}
      </>
    );
  } else {
    redirect("/careers");
  }
}
