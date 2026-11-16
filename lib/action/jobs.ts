import { Job } from "@/app/dashboard/recruiter/jobs/new/page"
import { CreateApplicationInput, Application } from "@/types/application";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createJobs = async (data: Job) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json()
}


export const deleteJob = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: "DELETE"
    })
    return res.json()
}

export async function applyToJob(data: CreateApplicationInput) {
    const res = await fetch(`${BASE_URL}/application`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json()
}

/**
 * Fetch the signed-in candidate's applications.
 * TODO: replace with the real API call, e.g. GET `${BASE_URL}/applications?userId=...`
 */
export async function getMyApplications(query = ""): Promise<Application[]> {
    const res = await fetch(`${BASE_URL}/application?${query}`)
    return res.json()
}
export async function getMyApplicationsCount(query = ""): Promise<{count:number}> {
    const res = await fetch(`${BASE_URL}/application/count?${query}`)
    return res.json()
}