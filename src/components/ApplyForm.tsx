import React from "react";

interface ApplicationFormProps {
  formData: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getSubmitButtonText: any;
  isSubmitDisabled: boolean;
}

const ApplicationForm = ({
  formData,
  handleChange,
  getSubmitButtonText,
  isSubmitDisabled,
}: ApplicationFormProps) => {
  const inputFields = [
    {
      id: "ApplicantName",
      name: "Applicant_Name",
      placeholder: "Full Name*",
      type: "text",
    },
    
    {
      id: "email",
      name: "Applicant_Email",
      placeholder: "Email*",
      type: "text",
    },
    {
      id: "phone",
      name: "Applicant_Phone",
      placeholder: "Phone*",
      type: "text",
    },
    {
      id: "linkedinURL",
      name: "Applicant_Links",
      placeholder: "LinkedIn/portfolio URL",
      type: "text",
    },
  ];

  {/*const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Pass the updated form data to the parent component (Apply) using handleChange
      handleChange({
        target: {
          name: "Applicant_Resume",
          value: file,
        },
      });
    }
  };*/}

  return (
    <form>
      <div className="text-center">
        <label htmlFor="position">Apply for this position:</label>
      </div>
      {inputFields.map((field) => (
        <input
          key={field.id}
          type={field.type}
          id={field.id}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          className="border border-black mx-auto justify-center rounded md block w-2/3 p-2 mb-4"
          placeholder={field.placeholder}
          required
        />
      ))}
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
        //onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
      />
    </form>
  );
};

export default ApplicationForm;
