import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactElement;
}

export default function Modal({ show, onClose, children }: ModalProps) {
  if (!show) return null;



  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="bg-white p-4 w-4/5 md:w-1/2 rounded-lg max-h-screen overflow-y-auto"
      >
        <button className="float-right font-bold text-lg" onClick={onClose}>
          x
        </button>
        <section id="child" className="w-full h-full my-2">{children}</section>
        <button
          className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
