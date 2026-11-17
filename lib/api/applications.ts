import type { Application } from "@/types/application";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/** Fetch all applications submitted for a single job (recruiter view). */
export const getJobApplications = async (
    jobId: string,
): Promise<Application[]> => {
    const res = await fetch(`${BASE_URL}/application?jobId=${jobId}`);
    return res.json();
};
