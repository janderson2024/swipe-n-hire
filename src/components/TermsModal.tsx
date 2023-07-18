import React from "react";

interface TermsModalProps {
  show: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 w-2/3 md:w-1/2 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Terms of Use</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus
          libero vitae semper accumsan. Phasellus nec hendrerit ex. Integer
          tempor quam id ante consectetur tincidunt. Nulla facilisi. Proin
          feugiat, dui a lacinia pulvinar, quam purus gravida dui, eget
          fringilla risus nisl at arcu. Nam euismod justo nec venenatis
          facilisis. Fusce vitae eleifend felis.
        </p>
        <button
          className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
