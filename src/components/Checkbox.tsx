"use client";
import React from "react";

interface TermsCheckboxProps {
  isChecked: boolean;
  handleCheckboxClick: any;
  openModal: any;
}

const TermsCheckbox = ({
  isChecked,
  handleCheckboxClick,
  openModal,
}: TermsCheckboxProps) => {
  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <input
          type="checkbox"
          id="termsCheckbox"
          className="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
          onChange={handleCheckboxClick}
        />
        <label
          htmlFor="termsCheckbox"
          className="w-48 cursor-pointer text-purple-600 ml-2 hover:text-purple-400 hover:underline pb-5"
          onClick={openModal}
        >
          I have read and agree to the Terms of Use
        </label>
      </div>
    </>
  );
};

export default TermsCheckbox;
