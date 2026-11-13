import { Job } from "@/app/dashboard/recruiter/jobs/new/page"

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL

export const createJobs = async(data: Job)=>{
    const res = await fetch(`${BASE_URL}/jobs`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    return res.json()
}


export const deleteJob = async (jobId: string)=>{
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`,{
        method: "DELETE"
    })
    return res.json()
}