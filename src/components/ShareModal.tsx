import { features } from "process";
import React from "react";

interface ShareModalProps {
  show: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  const link = "linkkkkk";

  return (
    <div onClick={onClose}className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div onClick={(event)=>{event.stopPropagation()}}className="bg-white p-4 w-2/3 md:w-1/2 rounded-lg max-h-screen overflow-y-auto">
        <button className="float-right" onClick={onClose}>
          x
        </button>
        <br />
        <h1>Share</h1>
        <h2>Link: {link}</h2>
        <button 
        className="border-2 border-slate-500 bg-slate-300 hover:bg-slate-400"
        onClick={()=>{
            open("https://www.linkedin.com/sharing/share-offsite/?url=https://swipe-n-hire-git-development-janderson2024.vercel.app/careers/5","_blank", "popup=true,width=500,height=500");
        }}
        >
          Post to LinkedIn
        </button>
        <br />
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

export default ShareModal;
