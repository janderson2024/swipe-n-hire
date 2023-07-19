"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/navbar";
import Link from "next/link";
import Logo from "@/components/Logo";
import BackArrow from "@/components/BackArrow";
import TermsModal from "@/components/TermsModal";
import BackToOpenings from "@/components/BackToOpenings";
import Checkbox from "@/components/Checkbox";
import ApplicationForm from "@/components/ApplyForm";

export default function Apply() {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitDisabled(true);
      setTimeout(() => {
        setIsSubmitDisabled(false);
        setIsSubmitted(false);
      }, 10000);
    }
  }, [isSubmitted]);

  const handleCheckboxClick = () => {
    if (!isSubmitted) {
      setIsChecked(!isChecked);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!isChecked) {
      return;
    }

    setIsSubmitted(true);

    // Simulate an API call or form submission
    setTimeout(() => {
      setIsSubmitDisabled(false);
      setIsSubmitted(false);
    }, 5000);
  };

  const getSubmitButtonText = () => {
    if (isSubmitted) {
      return "Submitted";
    }
    return "Submit";
  };

  return (
    <>
      <NavBar LeftItem={Logo} RightItem={BackToOpenings} />
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
          <ApplicationForm
            handleSubmit={handleSubmit}
            getSubmitButtonText={getSubmitButtonText}
            isSubmitDisabled={isSubmitDisabled}
          />
          <Checkbox
            isChecked={isChecked}
            handleCheckboxClick={handleCheckboxClick}
            openModal={openModal}
          />
          {showModal && (
            <TermsModal show={showModal} onClose={handleModalClose} />
          )}
        </div>
      </main>
    </>
  );
}
