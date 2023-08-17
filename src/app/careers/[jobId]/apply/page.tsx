"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import BackArrow from "@/components/BackArrow";
import TermsModal from "@/components/TermsModal";
import Checkbox from "@/components/Checkbox";
import createNewApplication from "@/backend/createNewApplication";
//import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import getJob from "@/backend/getJob";
import { useRouter } from "next/navigation";

interface ApplicationFormProps {
  formData: any;
  setFormData: any;
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
        appearance={{
          button:
            "ut-ready:bg-purple-700 ut-uploading:cursor-not-allowed rounded-r-none bg-purple-500 bg-none after:bg-purple-400",
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          console.log("Files: ", res);
          console.log(res[0].fileUrl);

          setFormData((prevFormData: any) => ({
            ...prevFormData,
            ["Applicant_Resume"]: res[0].fileUrl,
          }));

          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
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
        className="bg-purple-700 hover:bg-purple-500 mx-auto justify-center text-white py-2 px-4 rounded-md md cursor-pointer block w-1/3 p-2 mb-4"
        disabled={isSubmitDisabled}
      >
        {getSubmitButtonText()}
      </button>
    </form>
  );
};

export default function Apply({ params }: { params: { jobId: string } }) {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [jobTitle, setJobTitle] = useState("");
  const router = useRouter();

  const getJobData = async () => {
    const findJob = await getJob(params.jobId);
    setJobTitle(findJob.Job_Name);
  };

  useEffect(() => {
    getJobData();
  }, [params.jobId]);

  const [formData, setFormData] = useState({
    Job_ID: params.jobId,
    Applicant_Name: "",
    Applicant_Email: "",
    Applicant_Phone: "",
    Applicant_Links: "",
    Applicant_Legal: false,
    Applicant_Resume: "",
  });

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
      router.push("/careers");
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
    <main className="flex flex-col items-center justify-center h-max">
      <Link
        href="./"
        className="text-purple-700 hover:text-purple-400 font-semibold flex items-center pt-4 pb-7"
      >
        <BackArrow />
        View Job Description
      </Link>
      <h2 className="text-center text-gray-600 font-semibold text-lg">
        Job ID: {params.jobId} - {jobTitle}
      </h2>
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
      {showModal && <TermsModal show={showModal} onClose={handleModalClose} />}
    </main>
  );
}
