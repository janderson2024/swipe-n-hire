"use client"; 
import Link from "next/link";
import NavBar from "@/components/navbar";
import Logo from "@/components/Logo";
import { useState } from "react";

function BackToOpenings() {
  return (
    <Link href="/careers" className="text-blue-500">
      &lt; back to openings
    </Link>
  );
}

export default function Apply() {
  const [showTerms, setShowTerms] = useState(false);


  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
  };

  return (
    <>
      <NavBar LeftItem={Logo} RightItem={BackToOpenings} />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <Link href="/job-description" className="text-blue-500">
            View Job Description
          </Link>
          <h2 className="text-center text-lg font-bold m-2">Position Title</h2>
          <p className="text-center text-gray-600">Job ID: XYZ123</p>
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3 p-6 rounded">
          <form>
            <div className="text-center">
              <label htmlFor="position">Apply for this position:</label>
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="border border-black mx-auto justify-center rounded md block w-2/3 p-2 mb-4"
              placeholder="First Name*"
            />

            <input
              type="text"
              id="lastName"
              name="lastName"
              className="border border-black mx-auto justify-center block rounded md w-2/3 p-2 mb-4"
              placeholder="Last Name*"
            />

            <input
              type="text"
              id="email"
              name="email"
              className="border border-black mx-auto justify-center block rounded md w-2/3 p-2 mb-4"
              placeholder="Email*"
            />

            <input
              type="text"
              id="phone"
              name="phone"
              className="border border-black mx-auto justify-center block rounded md w-2/3 p-2 mb-4"
              placeholder="Phone*"
            />

            <input
              type="text"
              id="linkedinURL"
              name="linkedinURL"
              className="border border-black mx-auto justify-center rounded md block w-2/3 p-2 mb-4"
              placeholder="LinkedIn/portfolio URL"
            />

            <label
              htmlFor="fileInput"
              className="bg-blue-500 hover:bg-blue-700 mx-auto justify-center text-white font-bold py-2 px-4 rounded md cursor-pointer block w-2/3 p-2 mb-4 text-center"
            >
              Upload Resume
            </label>
            
            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 hover:bg-blue-700 mx-auto justify-center text-white font-bold py-2 px-4 rounded md cursor-pointer block w-2/3 p-2 mb-4"
            />

            {/* Checkbox for Terms and Conditions */}
            <div className="flex items-center justify-center mt-4">
              <input
                type="checkbox"
                id="termsCheckbox"
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                checked={showTerms}
                onChange={() => setShowTerms(!showTerms)}
              />
              <label htmlFor="termsCheckbox" className="w-1/2 cursor-pointer text-blue-600 ml-2 hover:text-purple-700 hover:underline" >
                I have read and agree to the Terms of Use
              </label>
            </div>
             {/* Terms and Conditions Box */}
             {showTerms && (
              <div className="m-auto mt-4 w-2/3 p-4 border border-gray-300 rounded">
                <h3 className="text-lg font-bold">Terms of Use</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  cursus libero vitae semper accumsan. Phasellus nec hendrerit
                  ex. Integer tempor quam id ante consectetur tincidunt. Nulla
                  facilisi. Proin feugiat, dui a lacinia pulvinar, quam purus
                  gravida dui, eget fringilla risus nisl at arcu. Nam euismod
                  justo nec venenatis facilisis. Fusce vitae eleifend felis.
                </p>
              </div>
            )}
            
          </form>
        </div>
      </main>
    </>
  );
}
