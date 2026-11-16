export type Job = {
    _id: string;
    jobTitle: string;
    companyName: string;
    category: string;
    jobType: string;
    location: string;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    salaryFrequency: string;
    qualifications: string;
    responsibilities: string;
    applicants: number;
    /** Set on jobs created internally by recruiters (see recruiter/jobs/new/actions.ts) */
    remote?: boolean;
};
