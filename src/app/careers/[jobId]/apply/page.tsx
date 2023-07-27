"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/navbar";
import dbConn from "@/backend/databaseConnect";
import Link from "next/link";
import Logo from "@/components/Logo";
import BackArrow from "@/components/BackArrow";
import TermsModal from "@/components/TermsModal";
import BackToOpenings from "@/components/BackToOpenings";
import Checkbox from "@/components/Checkbox";
import createNewApplication from "@/backend/createNewApplication";

interface ApplicationFormProps {
  formData: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: any;
  getSubmitButtonText: any;
  isSubmitDisabled: boolean;
}

const ApplicationForm = ({
  formData,
  handleChange,
  handleSubmit,
  getSubmitButtonText,
  isSubmitDisabled,
}: ApplicationFormProps) => {
  return (
    <form
      action={createNewApplication}
      className="w-full md:w-2/3 lg:w-1/3 p-6 rounded"
    >
      <div className="text-center">
        <label htmlFor="position">Apply for this position:</label>
      </div>

      <input
        type="text"
        id="fullName"
        name="Applicant_Name"
        value={formData.Applicant_Name}
        onChange={handleChange}
        className="border border-black mx-auto justify-center rounded md block w-2/3 p-2 mb-4"
        placeholder="Full Name*"
        required
      />

      <input
        type="text"
        id="email"
        name="Applicant_Email"
        value={formData.Applicant_Email}
        onChange={handleChange}
        className="border border-black mx-auto justify-center rounded md block w-2/3 p-2 mb-4"
        placeholder="Email*"
        required
      />

      <input
        type="text"
        id="phone"
        name="Applicant_Phone"
        value={formData.Applicant_Phone}
        onChange={handleChange}
        className="border border-black mx-auto justify-center rounded md block w-2/3 p-2 mb-4"
        placeholder="Phone*"
        required
      />

      <input
        type="text"
        id="linkedinURL"
        name="Applicant_Links"
        value={formData.Applicant_Links}
        onChange={handleChange}
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
        type="file"
        id="fileInput"
        name="Applicant_Resume"
        // onChange={handleFileChange} // You can add back this if needed
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
      />

      <button
        type="button"
        onClick={handleSubmit}
        value={getSubmitButtonText()}
        className="bg-purple-700 hover:bg-purple-900 mx-auto justify-center text-white font-bold py-2 px-4 rounded md cursor-pointer block w-2/3 p-2 mb-4"
        disabled={isSubmitDisabled}
      />
    </form>
  );
};

export default function Apply({ params }: { params: { jobId: string } }) {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [formData, setFormData] = useState({
    Job_ID: params.jobId,
    Applicant_Name: "",
    Applicant_Email: "",
    Applicant_Phone: "",
    Applicant_Links: "",
    Applicant_Legal: false,
    Applicant_Resume: "",
  });

  useEffect(() => {
    if (isSubmitted) {
      setIsSubmitDisabled(true);
      setTimeout(() => {
        setIsSubmitDisabled(false);
        setIsSubmitted(false);
      }, 5000);
    }
  }, [isSubmitted]);

  const handleCheckboxClick = (event: any) => {
    console.log(event)
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["Applicant_Legal"]: event.target.checked
    }));
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
   //* if (!isChecked) {
      //return;
  

    try {
      // Call the createNewApplication function with formData
      const serverResponse = await createNewApplication(formData);

      // Here, you can use the serverResponse if needed
      console.log(serverResponse);

      setIsSubmitted(true);

      // Simulate an API call or form submission
      setTimeout(() => {
        setIsSubmitDisabled(false);
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error creating application:", error);
    }
  };

  const getSubmitButtonText = () => {
    if (isSubmitted) {
      return "Submitted";
    }
    return "Submit";
  };

  return (
    <>
      <NavBar LeftItem={<Logo />} RightItem={BackToOpenings("/careers")} />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center">
          <Link href="./" className="text-blue-700 flex items-center">
            <BackArrow />
            View Job Description
          </Link>
          <h2 className="text-center text-lg font-bold m-2">Position Title</h2>
          <p className="text-center text-gray-600">Job ID: {params.jobId}</p>
        </div>

        <ApplicationForm
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
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
      </main>
    </>
  );
}
