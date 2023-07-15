import Link from "next/link";
import NavBar from "@/components/navbar"
import HRProfileImage from "@/components/HRProfileImage";
import JobStatusToggle from "@/components/JobStatusToggle";

function BackToOpenings() {
    return (
      <Link href="../" className="text-blue-500">
        &lt; back to openings
      </Link>
    );
  }

  function PostingsNavBar()  {
    return  (
      <><Link href ="/hr/{jobId}/edit-posting">
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


export default function EditPosting() {
    return (
      <>
      <div>
        <NavBar
              LeftItem={BackToOpenings}
              CenterItem={PostingsNavBar}
              RightItem={HRProfileImage}
        />
      </div>
      <main>
        <div className="flex">
          <form>
            <div>
            <input type = "text" placeholder="Department" 
                  id="department" name ="department" 
                  className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
              
              <input type = "text" placeholder="Employment Type" 
                  id="emplType" name ="emplType" 
                  className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
              
              <input type = "text" placeholder="Salary Range" 
                  id="salaryRange" name ="salaryRange" 
                  className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>

              <input type = "text" placeholder="Location" 
                  id="jobTitle" name ="jobTitle" 
                  className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>

              <input type = "text" placeholder="Job Title" 
                  id="jobTitle" name ="jobTitle" 
                  className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>

              <input type = "text" placeholder="Job ID Number" 
                  id="jodId" name ="jobId" 
                  className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>

              <button type="button" className="w-1/5 border-2 border-purple-700 bg-purple-700 text-white py-1 w-full">Position Filled</button>

              {/* Toggle Button Here*/}

              <textarea id="jobDescription" name ="jobDescription" placeholder="Enter job descrption here" 
              rows={8}
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>

            <button type="button" className="w-1/5 border-2 border-purple-700 bg-purple-700 text-white py-1 w-full">Save Posting</button>
            </div>
          </form>
        </div>
      </main>
      </>
    )
}