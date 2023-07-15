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

  function PostingsNavBar() {
    return  (
      <><Link href="/hr/{jobId}/edit-posting">
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

export default function EditEmails() {
    return (
      <>
      <div>
        <NavBar
          LeftItem={BackToOpenings}
          CenterItem={PostingsNavBar}
          RightItem={HRProfileImage}/>
      </div>
      <main className="flex h-screen px-5 py-5 items-center justify-center">
        <div className="w-11/12 p-6 bg-gray-100 shadow-lg rounded-md">
          <h1 className="text-2xl font-bold m-5 text-center">Job Name</h1> 
          <h2 className="text-2xl block text-center font-semibold text-purple-700">Customize Emails</h2>
          <hr className='mt-3'></hr>
        <form>
          <div className='mt-3 p-6'> 
          <label htmlFor="interviewEmail" className="block text-base mb-2">Interview Invitiation Email</label>
          <textarea id="interviewEmail" name ="interviewEmail" placeholder="Enter interview invitation here"
            rows={8}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
          </div>
          <div className='mt-3 p-6'>
            <label htmlFor="rejectionEmail" className="block text-base mb-2">Rejection Email</label>
            <textarea id="rejectionEmail" name ="rejectionEmail" placeholder="Enter rejection email here" 
              rows={8}
              className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"/>
          </div>
          <div className='flex justify-center mt-5'>
            <button type="submit" className="border-2 border-purple-700 bg-purple-700 text-white py-1 w-1/4">Submit Changes</button>
          </div>  
        </form>
        </div> {/*Will want to update to display actual job name once functionality set up*/}
      </main>
      </>
    )
}