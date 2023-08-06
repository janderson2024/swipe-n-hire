import { JobDb } from "@/types/job";
import { updateJobStatus } from "@/backend/editJobPosting";


export default function JobStatusToggle({ job }: { job: JobDb }) {
  const labelLinker = "job" + job.Job_ID + "toggle";

  const sendChangeToServer = async (event:any) => {
    const sendChange = await updateJobStatus(job.Job_ID, event.target.checked);
    console.log(sendChange);
  }

  return (
    <label
      htmlFor={labelLinker}
      className="flex 
        cursor-pointer 
        select-none 
        items-center"
    >
      <span className="pr-2">Open</span>
      <div className="relative">
        <input
          type="checkbox"
          id={labelLinker}
          className="peer sr-only"
          defaultChecked={job.Job_Status == "closed"}
          onChange={sendChangeToServer}
        />

        <div
          className="box 
          block 
          h-8 
          w-14 
          rounded-full 
          bg-slate-400
          peer-checked:bg-slate-700"
        ></div>
        <div
          className="dot 
          absolute 
          left-1 top-1 
          flex 
          h-6 w-6 
          items-center 
          justify-center 
          rounded-full 
          bg-white
          transition 
          peer-checked:translate-x-full"
        ></div>
      </div>
      <span className="pl-2">Closed</span>
    </label>
  );
}
