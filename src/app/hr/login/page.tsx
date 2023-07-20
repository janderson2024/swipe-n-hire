"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import NavBar from "@/components/navbar";
import addCookie from "@/backend/addCookie";

export default function HRLogin() {
  //These are here for when functionality is added later
  const [thing, addThing] = useState(0);
  const email = "";
  const pass = "";
  console.log(thing);
  addThing(12);

  return (
    <>
      <div>
        <NavBar LeftItem={Logo} />
      </div>
      <main className="flex h-screen items-center justify-center">
        <div className="max-h-screen w-96 p-6 bg-gray-100 rounded-md">
          <div className="text-2xl font-bold m-5 text-center">
            <Logo />
          </div>
          <h1 className="text-2xl block text-center font-semibold text-purple-700">
            Sign In
          </h1>
          <hr className="mt-3"></hr>
          <form action={addCookie} method="POST">
            <div className="mt-3">
              <label htmlFor="email" className="block text-base mb-2">
                Email Address
              </label>
              <input
                type="email"
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
                type="password"
                placeholder="********"
                id="password"
                name="password"
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus: border-gray-600"
              />
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="border-2 border-purple-700 bg-purple-700 text-white py-1 w-full"
              >
                Sign In
              </button>
            </div>
          </form>
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
