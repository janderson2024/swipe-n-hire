"use client";
import React from "react";

interface ApplicationFormProps {
  handleSubmit: any;
  getSubmitButtonText: any;
  isSubmitDisabled: boolean;
}

const ApplicationForm = ({ handleSubmit, getSubmitButtonText, isSubmitDisabled }: ApplicationFormProps) => {
  const inputFields = [
    {
      id: "firstName",
      name: "firstName",
      placeholder: "First Name*",
      type: "text",
    },
    {
      id: "lastName",
      name: "lastName",
      placeholder: "Last Name*",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      placeholder: "Email*",
      type: "text",
    },
    {
      id: "phone",
      name: "phone",
      placeholder: "Phone*",
      type: "text",
    },
    {
      id: "linkedinURL",
      name: "linkedinURL",
      placeholder: "LinkedIn/portfolio URL",
      type: "text",
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center">
        <label htmlFor="position">Apply for this position:</label>
      </div>
      {inputFields.map((field) => (
        <input
          key={field.id}
          type={field.type}
          id={field.id}
          name={field.name}
          className="border border-black mx-auto justify-center rounded md block w-2/3 p-2 mb-4"
          placeholder={field.placeholder}
        />
      ))}
      <label
        htmlFor="fileInput"
        className="bg-purple-700 hover:bg-purple-900 mx-auto justify-center text-white font-bold py-2 px-4 rounded md cursor-pointer block w-2/3 p-2 mb-4 text-center"
      >
        Upload Resume
      </label>

      <input
        type="submit"
        value={getSubmitButtonText()}
        className="bg-purple-700 hover:bg-purple-900 mx-auto justify-center text-white font-bold py-2 px-4 rounded md cursor-pointer block w-2/3 p-2 mb-4"
        disabled={isSubmitDisabled}
      />
    </form>
  );
};

export default ApplicationForm;
