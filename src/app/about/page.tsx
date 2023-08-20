"use client";
import React from "react";
import NavBar from "@/components/Navbar";
import Image from "next/image";
import Logo from "@/components/Logo";
import Link from "next/link";
import BackToOpenings from "@/components/BackToOpenings";

function LinkedInButton() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10 block m-auto"
    >
      <path d="M116.504,500.219V170.654H6.975v329.564H116.504 L116.504,500.219z M61.751,125.674c38.183,0,61.968-25.328,61.968-56.953c-0.722-32.328-23.785-56.941-61.252-56.941 C24.994,11.781,0.5,36.394,0.5,68.722c0,31.625,23.772,56.953,60.53,56.953H61.751L61.751,125.674z M177.124,500.219 c0,0,1.437-298.643,0-329.564H286.67v47.794h-0.727c14.404-22.49,40.354-55.533,99.44-55.533 c72.085,0,126.116,47.103,126.116,148.333v188.971H401.971V323.912c0-44.301-15.848-74.531-55.497-74.531 c-30.254,0-48.284,20.38-56.202,40.08c-2.897,7.012-3.602,16.861-3.602,26.711v184.047H177.124L177.124,500.219z" />
    </svg>

  );
}

export default function About() {
  const openLinkedInProfiles = () => {
    const linkedinProfiles = [
      "https://www.linkedin.com/in/dennis-m-bowen/",
      "https://www.linkedin.com/in/monica-tuttle/",
      "https://www.linkedin.com/in/janderson2024/",
    ];

    linkedinProfiles.forEach((profile) => {
      console.log("Hey");
      window.open(profile, "_blank");
    });
  };

  const openGitLab = () => {
    const gitLab = ["https://gitlab.com/janderson2024/swipe-n-hire"];

    gitLab.forEach((profile) => {
      window.open(profile, "_blank");
    });
  };

  return (
    <div className="min-h-screen">
      <NavBar LeftItem={<Logo />} RightItem={BackToOpenings("/careers")} />
      <div className="text-center w-full">
        <h1 className="font-bold text-purple-800 text-lg p-4">About</h1>
        <p>
          Swipe-n-Hire is designed to be a swift and intuitive web app for HR
          teams that simplifies posting jobs, reviewing applications, and
          notifying job applicants.
        </p>

        <br />
        <div>
          <h1 className="font-bold text-purple-800 text-lg pt-2 pb-4">
            Meet the Team
          </h1>
          <div className="pb-12 flex justify-center gap-8 sm:flex flex-wrap">
            <div className="border-2 border-purple-500 p-2 rounded">
              <Image
                className="rounded"
                src="/josh.png"
                alt="Joshua Anderson"
                width={200}
                height={200}
              />
              <p className="text-center text-purple-700 font-semibold">
                <Link
                  href="https://www.linkedin.com/in/janderson2024/"
                  className="hover:underline hover:text-purple-400"
                  target="_blank"
                >
                  Joshua Anderson
                  <br />
                  <LinkedInButton />
                </Link>
              </p>
            </div>
            <div className="border-2 border-purple-500 p-2 rounded">
              <Image
                className="rounded"
                src="/dennis.jpeg"
                alt="Dennis Bowen"
                width={200}
                height={200}
              />
              <p className="text-center text-purple-700 font-semibold">
                <Link
                  href="https://www.linkedin.com/in/dennis-m-bowen/"
                  className="hover:underline hover:text-purple-400"
                  target="_blank"
                >
                  Dennis Bowen
                  <br />
                  <LinkedInButton />
                </Link>
              </p>
            </div>
            <div className="border-2 border-purple-500 p-2 rounded">
              <Image
                className="rounded"
                src="/monica.jpeg"
                alt="Monica Tuttle"
                width={200}
                height={250}
              />
              <p className="text-center text-purple-700 font-semibold">
                <Link
                  href="https://www.linkedin.com/in/monica-tuttle/"
                  className="hover:underline hover:text-purple-400"
                  target="_blank"
                >
                  Monica Tuttle
                  <br />
                  <LinkedInButton />
                </Link>
              </p>
            </div>
          </div>
          <footer className="flex flex-col justify-center items-center bg-purple-700 p-7 text-white text-sm">
            <div className="text-center mb-4">
              <h3 className="text-white text-lg font-bold pb-4">
                Connect with us!
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  className="p-3 mx-2 border-2 rounded bg-purple-400 hover:bg-purple-300"
                  onClick={openLinkedInProfiles}
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
                <button className="p-1 border-2 rounded bg-purple-400 hover:bg-purple-300">
                  <Image
                    src="/gitlab_icon.png"
                    alt="See code on Gitlab"
                    width={55}
                    height={60}
                    onClick={openGitLab}
                  />
                </button>
              </div>
            </div>
            <div className="mt-4">
              &copy; 2023 Joshua Anderson, Dennis Bowen, Monica Tuttle{" "}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
