"use client";

import NavBar from "@/components/navbar";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useState } from "react";
import BackArrow from "@/components/BackArrow";
import TermsModal from "@/components/TermsModal";
import BackToOpenings from "@/components/BackToOpenings";

export default function Apply() {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Function to check if the checkbox is checked
  const isSubmitDisabled = !isChecked;

  // Function to handle form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isSubmitDisabled || isSubmitting) {
      return;
    }

    // Simulate form submission (you can replace this with your actual form submission logic)
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 10000); // 10 seconds delay before resetting to "Submit"
  };

  // Function to get the text of the submit button
  const getSubmitButtonText = () => {
    if (isSubmitting) {
      return "Submitted";
    }
    return "Submit";
  };

  // Function to get the class name for the submit button
  const getSubmitButtonClass = () => {
    let className =
      "bg-purple-700 hover:bg-purple-900 mx-auto justify-center text-white font-bold py-2 px-4 rounded md cursor-pointer block w-2/3 p-2 mb-4";
    if (isSubmitDisabled) {
      className += " bg-gray-500 cursor-not-allowed"; // Add gray purple color and disable the cursor
    }
    return className;
  };


  return (
    <>
      <NavBar LeftItem={<Logo/>} RightItem={BackToOpenings("/careers")} />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <Link href="./" className="text-blue-700 flex items-center">
            <BackArrow />
            View Job Description
          </Link>
          <h2 className="text-center text-lg font-bold m-2">Position Title</h2>
          <p className="text-center text-gray-600">Job ID: XYZ123</p>
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3 p-6 rounded">
          <form onSubmit={handleSubmit}>
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
          value={getSubmitButtonText()} // Change the text based on submission status
          className={getSubmitButtonClass()} // Apply the class based on the checkbox status
          disabled={isSubmitDisabled || isSubmitting} // Disable the button if the checkbox is not checked or submission is in progress
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
