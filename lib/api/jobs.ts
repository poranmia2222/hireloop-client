import type { Job } from "@/types/job";

export type { Job };

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getJobs = async (query = ""): Promise<Job[]> => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`);
    return res.json();
};

export const getJobById = async (id: string): Promise<Job | undefined> => {
    // The API has no single-job endpoint yet (/jobs/:id returns an HTML 404),
    // so we fetch the list and find the job by id.
    const jobs = await getJobs();
    return jobs.find((job) => job._id === id);
};

