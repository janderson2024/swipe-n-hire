"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import NavBar from "@/components/Navbar";
import { loginUser } from "@/backend/HrUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackToOpenings from "@/components/BackToOpenings";

export default function HRLogin() {
  const router = useRouter();
  const [cssHidden, setCssHidden] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitLoginData() {
    const resp = await loginUser(email, password);
    //if we make it to this point, there is an error. Otherwise it redirects

    if (resp.error) {
      setCssHidden(false);
      setErrorMsg(resp.error);
    } else {
      router.push("/hr");
    }
  }

  return (
    <>
      <NavBar LeftItem={<Logo />} RightItem={BackToOpenings("/careers")} />
      <main className="flex h-main-under-nav items-center justify-center">
        <div className="max-h-screen w-96 p-6 bg-gray-100 rounded-md">
          <div className="text-2xl font-bold m-5 text-center">
            <Logo className="text-black" />
          </div>
          <h1 className="text-2xl block text-center font-semibold text-purple-700">
            Sign In
          </h1>
          <hr className="mt-3"></hr>

          <div id="form">
            <div className="mt-3">
              <label htmlFor="email" className="block text-base mb-2">
                Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="example@gmail.com"
                id="email"
                name="email"
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="block text-base mb-2">
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                placeholder="********"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="password"
                name="password"
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
              />
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={submitLoginData}
                className="border-2 border-purple-700 bg-purple-700 text-white py-1 w-full"
              >
                Sign In
              </button>
            </div>
          </div>
          <div
            className={
              "border-2 py-1 w-full border-red-700 bg-red-500 text-black text-center mt-2 rounded font-bold " +
              (cssHidden && "hidden")
            }
          >
            {errorMsg}
          </div>
          <div className="mt-3 text-center text-xs font-semibold">
            <Link href="/hr/forgot-password" className="text-purple-600">
              Forgot Password?
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
