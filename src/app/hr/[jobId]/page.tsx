export default function JobDescription({
    params,
  }: {
    params: { jobId: string };
  }) {
      console.log(params);
    return <div>JOB: {params.jobId}</div>;
  }