import Link from "next/link";
import NavBar from "@/components/navbar";
import Logo from "@/components/Logo";


function BackToOpenings() {
  return (
    <Link href="/careers" className="text-blue-500">
      &lt; back to openings
    </Link>
  );
}

export default function Apply() {
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    // You can perform further actions with the uploaded file here
  };

  return (
    <>
      <NavBar LeftItem={Logo} RightItem={BackToOpenings}/>
      <main className="flex min-h-screen items-center justify-center p-24">
        <div className="bg-white p-8 rounded shadow w-full xl:w-1/4">
          <form className="mt-4m">
            <label htmlFor="position" className="text-center">
              Apply for this position:
            </label>

            <input
              type="text"
              id="firstName"
              name="firstName"
              className="border border-black rounded md block w-full p-2 mb-4"
              placeholder="First Name*"
            />

            <input
              type="text"
              id="lastName"
              name="lastName"
              className="border border-black block rounded md w-full p-2 mb-4"
              placeholder="Last Name*"
            />

            <input
              type="text"
              id="email"
              name="email"
              className="border border-black block rounded md w-full p-2 mb-4"
              placeholder="Email*"
            />

            <input
              type="text"
              id="phone"
              name="phone"
              className="border border-black block rounded md w-full p-2 mb-4"
              placeholder="Phone*"
            />

            <input
              type="text"
              id="linkedinURL"
              name="linkedinURL"
              className="border border-black rounded md block w-full p-2 mb-4"
              placeholder="LinkedIn/portfolio URL"
            />

            <label
              htmlFor="fileInput"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md cursor-pointer block w-full p-2 mb-4 text-center"
            >
              Upload Resume
            </label>

            <input
              type="submit"
              value="Submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md  block w-full p-2 mb-4"
            />
          </form>
        </div>
      </main>
    </>
  );
}
