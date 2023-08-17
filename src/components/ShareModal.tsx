import { useState } from "react";

export default function ShareModal({ link }: { link: string }) {
  const [justCopied, setJustCopied] = useState(false);

  const linkedinLink =
    "https://www.linkedin.com/sharing/share-offsite/?url=" + link;

  return (
    <>
      <span className="text-2xl font-bold">Share</span>
      <section
        id="copy link"
        className="flex w-auto my-4 mx-2 content-center justify-between "
      >
        <label className="font-bold pr-2 self-center" htmlFor="">
          Link:
        </label>
        <input
          className="pl-1 rounded border-2 border-purple-700 w-2/3 bg-purple-100 focus:outline-none"
          readOnly={true}
          value={link}
        ></input>
        <div id="button-copy" className="grow flex">
          <button
            onClick={() => {
              navigator.clipboard.writeText(link);
              setJustCopied(true);

              setTimeout(() => {
                setJustCopied(false);
              }, 2000);
            }}
            className="mx-2 p-2 border-purple-700 border-2 rounded bg-purple-200 hover:bg-purple-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </button>
          {justCopied && <span className="self-center">Copied!</span>}
        </div>
      </section>
      <hr className="p-2 border-purple-300"></hr>
      <section id="links" className="flex mb-4">
        <button
          className="p-2 mx-2 border-2 border-purple-500 rounded bg-purple-200 hover:bg-purple-300"
          onClick={() => {
            open(linkedinLink, "_blank", "popup=true,width=600,height=500");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            viewBox="0 0 512 512"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path d="M116.504,500.219V170.654H6.975v329.564H116.504 L116.504,500.219z M61.751,125.674c38.183,0,61.968-25.328,61.968-56.953c-0.722-32.328-23.785-56.941-61.252-56.941 C24.994,11.781,0.5,36.394,0.5,68.722c0,31.625,23.772,56.953,60.53,56.953H61.751L61.751,125.674z M177.124,500.219 c0,0,1.437-298.643,0-329.564H286.67v47.794h-0.727c14.404-22.49,40.354-55.533,99.44-55.533 c72.085,0,126.116,47.103,126.116,148.333v188.971H401.971V323.912c0-44.301-15.848-74.531-55.497-74.531 c-30.254,0-48.284,20.38-56.202,40.08c-2.897,7.012-3.602,16.861-3.602,26.711v184.047H177.124L177.124,500.219z" />
          </svg>
        </button>
      </section>
    </>
  );
}
