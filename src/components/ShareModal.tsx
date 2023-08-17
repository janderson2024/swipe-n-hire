export default function ShareModal() {
  const link =
    "https://swipe-n-hire-ftjiq8vm9-janderson2024.vercel.app/careers/5";
  const linkedinLink =
    "https://www.linkedin.com/sharing/share-offsite/?url=" + link;

  return (
    <>
      <h1>Share</h1>
      <h2>Link: {link}</h2>
      <button
        className="border-2 border-slate-500 bg-slate-300 hover:bg-slate-400"
        onClick={() => {
          open(linkedinLink, "_blank", "popup=true,width=600,height=500");
        }}
      >
        Post to LinkedIn
      </button>
    </>
  );
}
