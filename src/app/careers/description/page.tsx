import NavBar from "@/components/navbar";
import Logo from "@/components/Logo";
import Link from "next/link";

function BackToOpenings() {
  return (
    <Link href="/careers" className="text-blue-500">
      &lt; back to openings
    </Link>
  );
}

function JobDescription() {
  const job = {
    id: 1,
    jobTitle: "Software Engineer",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu augue ut lectus arcu bibendum at varius vel pharetra. Egestas dui id ornare arcu odio ut sem nulla. Duis convallis convallis tellus id interdum velit laoreet id. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Facilisis sed odio morbi quis commodo odio aenean sed. Id velit ut tortor pretium viverra suspendisse. Nunc mi ipsum faucibus vitae aliquet nec. Dictum sit amet justo donec enim diam vulputate ut. At tempor commodo ullamcorper a lacus vestibulum sed arcu non. Ornare aenean euismod elementum nisi. Ullamcorper dignissim cras tincidunt lobortis. Eu sem integer vitae justo eget magna fermentum. Iaculis eu non diam phasellus vestibulum. Sit amet est placerat in egestas. Senectus et netus et malesuada. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Enim facilisis gravida neque convallis a cras. Leo vel orci porta non pulvinar neque. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Elit sed vulputate mi sit. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Ornare lectus sit amet est placerat in. Etiam dignissim diam quis enim lobortis scelerisque fermentum. Blandit libero volutpat sed cras. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Egestas congue quisque egestas diam in arcu cursus euismod quis. Sollicitudin tempor id eu nisl. Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare. Sed sed risus pretium quam vulputate dignissim suspendisse. Dui accumsan sit amet nulla facilisi morbi tempus iaculis. Id interdum velit laoreet id donec ultrices tincidunt arcu non. Ullamcorper malesuada proin libero nunc. Phasellus faucibus scelerisque eleifend donec pretium. Dui accumsan sit amet nulla facilisi. Quis risus sed vulputate odio ut enim blandit. Pellentesque elit ullamcorper dignissim cras tincidunt. Dolor sit amet consectetur adipiscing elit ut aliquam. Dignissim sodales ut eu sem integer vitae justo. Aliquet eget sit amet tellus. Aliquet enim tortor at auctor urna nunc. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Lorem ipsum dolor sit amet consectetur adipiscing. Scelerisque in dictum non consectetur a erat nam at. Etiam non quam lacus suspendisse. Volutpat blandit aliquam etiam erat velit scelerisque in dictum non. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Tellus mauris a diam maecenas sed enim ut sem.",
    department: "Engineering",
    employmentType: "Full-time",
    salary: "$80,000 - $100,000",
    location: "New York, USA",
  };

  return (
    <>
      <NavBar LeftItem={Logo} RightItem={BackToOpenings} />
      <main className="flex flex-col items-center justify-center">
        <div className="w-full md:w-2/3 flex justify-between mt-4 px-6">
          <div className="text-left">
            <p>Department: {job.department}</p>
            <p>Employment Type: {job.employmentType}</p>
          </div>
          <div className="text-right">
            <p>Salary Range: {job.salary}</p>
            <p>Location: {job.location}</p>
          </div>
        </div>
        <div className="border p-6 w-2/3 justify-center rounded m-10">
          <h1 className="text-lg font-bold mb-4">
            {job.jobTitle} - Job ID: {job.id}
          </h1>
          <p className="text-gray-600 mb-4">
            Job Description: {job.description}
          </p>

          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Apply for this Job
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default JobDescription;
