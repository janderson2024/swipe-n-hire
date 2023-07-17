var Convert = require("ansi-to-html");

async function getDeploymentErrors(deploymentID: string) {
  const bearer: any = process.env.JoshBearer?.toString();

  const url =
    "https://api.vercel.com/v2/deployments/" + deploymentID + "/events?build=1";

  const resp = await fetch(url, {
    headers: {
      Authorization: bearer,
    },
    method: "get",
  });
  const lines = await resp.json();

  var output: any = {};
  var convert = new Convert();
  for (var line of lines) {
    if (line.payload.text && line.type == "stderr") {
      output.data += convert.toHtml(line.payload.text) + "<br/>";
    }
  }
  return output;
}

async function getDeployments() {
  const bearer: any = process.env.JoshBearer?.toString();

  const state = "state=ERROR";

  const projID = "projectID=prj_cg9SjSayJ0hEszypGDMxL7ILzWCE";

  const url = "https://api.vercel.com/v6/deployments?" + projID + "&" + state;

  const resp = await fetch(url, {
    headers: {
      Authorization: bearer,
    },
    method: "get",
  });

  var deployments = [];
  const deploymentData = await resp.json();

  for (var i=0; i< deploymentData.deployments.length; i++) {
    deployments.push({
      id: deploymentData.deployments[i].uid,
      author: deploymentData.deployments[i].meta.gitlabCommitAuthorName,
      title: deploymentData.deployments[i].meta.gitlabCommitMessage,
      commitId: deploymentData.deployments[i].meta.gitlabCommitSha,
    });
  }

  return deployments;
}

export default async function BuildStuff() {
  console.log(process.env.JoshBearer);

  const deploymentErrors: any = [];
  const deployments = await getDeployments();
  for (var deploment of deployments) {
    var de = await getDeploymentErrors(deploment.id);
    de.info = deploment;
    deploymentErrors.push(de);
  }

  return (
    <main>
      {deploymentErrors.map((de: any) => (
        <div key={de.info.id}>
          <div className="bg-slate-500 text-white text-center border-b-4 border-white">
            <p>AUTHOR: {de.info.author}</p>
            <p>TITLE: {de.info.title}</p>
            <p>COMMIT: {de.info.commitId}</p>
            <label
              htmlFor={de.info.id}
              className="m-4 rounded-full bg-zinc-700 border-black border-4"
            >
              SHOW/HIDE
            </label>
          </div>
          <input type="checkbox" id={de.info.id} className="peer sr-only" />
          <div
            id="idx"
            className="hidden bg-black text-white text-center peer-checked:block"
            dangerouslySetInnerHTML={{ __html: de.data }}
          ></div>
          <br />
        </div>
      ))}
    </main>
  );
}
