"use client";
import { useState, useEffect } from "react";
import NavBar from "@/components/navbar";
import Link from "next/link";
import Logo from "@/components/Logo";
import BackArrow from "@/components/BackArrow";
import TermsModal from "@/components/TermsModal";
import BackToOpenings from "@/components/BackToOpenings";
import Checkbox from "@/components/Checkbox";
import createNewApplication from "@/backend/createNewApplication";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core"
import ApplicantJobPostings from "@/backend/JobsDb";

interface ApplicationFormProps {
  formData: any;
  setFormData:any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: any;
  getSubmitButtonText: any;
  isSubmitDisabled: boolean;
  isChecked: boolean;
  handleCheckboxClick: (event: any) => void;
  openModal: () => void;
}

const ApplicationForm = ({
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  getSubmitButtonText,
  isSubmitDisabled,
  isChecked,
  handleCheckboxClick,
  openModal,
}: ApplicationFormProps) => {
  return (
    <form
      action={createNewApplication}
      className="w-full md:w-2/3 lg:w-1/3 p-6 rounded"
    >
      <div className="text-center font-semibold pb-3">
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
      <div className="text-center pb-3 font-semibold">
      <h3>Upload Your Resume:</h3>
     </div>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res:any) => {
          // Do something with the response
          console.log("Files: ", res);
          console.log(res[0].fileUrl);

          setFormData((prevFormData:any) => ({
            ...prevFormData,
            ["Applicant_Resume"]: res[0].fileUrl,
          }));

          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    
      <Checkbox
        isChecked={isChecked}
        handleCheckboxClick={handleCheckboxClick}
        openModal={openModal}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-800 mx-auto justify-center text-white py-2 px-4 rounded md cursor-pointer block w-32 p-2 mb-4"
        disabled={isSubmitDisabled}
      >
        {getSubmitButtonText()}
      </button>
    </form>
  );
};

export default function Apply({ params }: { params: { jobId: string, jobTitle: string } }) {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [jobs, setJobs] = useState<JobDb[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobsFromDB: JobDb[] = await ApplicantJobPostings();
        setJobs(jobsFromDB);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
  }, []);

  const [formData, setFormData] = useState({
    Job_ID: params.jobId,
    Job_Name: params.jobTitle,
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["Applicant_Legal"]: event.target.checked,
    }));

    setIsSubmitDisabled(!event.target.checked);
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

    try {
      const serverResponse = await createNewApplication(formData);

      console.log(serverResponse);

      setIsSubmitted(true);

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
          <h2 className="text-center text-lg font-bold m-2">{params.Job_Title}</h2>
          <p className="text-center text-gray-600">Job ID: {params.jobId}</p>
        </div>
        <ApplicationForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          getSubmitButtonText={getSubmitButtonText}
          isSubmitDisabled={isSubmitDisabled}
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
