export function getTestJobs() {
  let testJobs: Job[] = [
    {
      JobID: 10,
      JobTitle: "Real Job",
      JobDate: "7/19/23",
      JobCreator: "Person",
      JobOpen: true,
      JobOpenApplications: 40,
    },
    {
      JobID: 11,
      JobTitle: "Fake Job",
      JobDate: "7/29/23",
      JobCreator: "Alien",
      JobOpen: false,
      JobOpenApplications: 30,
    },
    {
      JobID: 12,
      JobTitle: "CEO",
      JobDate: "7/09/23",
      JobCreator: "Worm",
      JobOpen: true,
      JobOpenApplications: 4,
    },
  ];
  return testJobs;
}

export interface Job {
  JobID: number;

  JobTitle?: string;
  JobDate?: string;
  JobCreator?: string;
  JobSalary?: string;
  JobDepartment?: string;
  JobEmployment?: string;

  JobOpen: boolean;

  JobOpenApplications: number;
}
