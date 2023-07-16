"use client";
{
  /*Do we want to avoid client-side rendering? */
}
import NavBar from "@/components/navbar";
import Logo from "@/components/Logo";
import { useState } from "react";
import BackToOpenings from "@/components/BackToOpenings";
import BackToJobDescription from "@/components/BackToJobDescription";
import TermsModal from "@/components/TermsModal";

export default function Apply() {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox click
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setShowModal(false);
  };

  // Function to show the modal and check the checkbox
  const openModal = () => {
    setShowModal(true);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
  };

  return (
    <>
      <NavBar LeftItem={Logo} RightItem={BackToOpenings} />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <BackToJobDescription />
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
              className="bg-purple-700 hover:bg-purple-900 mx-auto justify-center text-white font-bold py-2 px-4 rounded md cursor-pointer block w-2/3 p-2 mb-4 text-center"
            >
              Upload Resume
            </label>

            <input
              type="submit"
              value="Submit"
              className="bg-purple-700 hover:bg-purple-900 mx-auto justify-center text-white font-bold py-2 px-4 rounded md cursor-pointer block w-2/3 p-2 mb-4"
            />
            {/* Checkbox for Terms and Conditions */}
            <div className="flex items-center justify-center mt-4">
              <input
                type="checkbox"
                id="termsCheckbox"
                className="form-checkbox h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
                checked={isChecked}
                onChange={handleCheckboxClick}
              />
              <label
                htmlFor="termsCheckbox"
                className="w-1/2 cursor-pointer text-blue-500 ml-2 hover:text-purple-600 hover:underline"
                onClick={openModal}
              >
                I have read and agree to the Terms of Use
              </label>
            </div>
            {/* Terms and Conditions Modal */}
            {showModal && (
              <TermsModal show={showModal} onClose={handleModalClose} />
            )}
          </form>
        </div>
      </main>
    </>
  );
}
