'use client'

import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { applyToJob } from "@/lib/action/jobs";
import { CreateApplicationInput } from "@/types/application";

export function ApplyButton({className,size = "default", job}: 
    {className?: string;size?: "default" | "lg";
        job:Job
}) {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();
    // console.log(id)

    const handleApplyNow = async() => {
        if (!user) {
            router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`);
            return
        }
        else if(user.role === "candidate"){
            const application: CreateApplicationInput = {
                jobId: job._id,
                userId: user.id,
                email: user.email ?? "",
                jobTitle: job.jobTitle,
                companyName: job.companyName,
                jobType: job.jobType,
                workMode: job.remote ? "Remote" : "On-site",
                location: job.location,
                appliedAt: new Date().toISOString(),
            }
            const result = await applyToJob(application)
            if(result.insertedId){
                console.log("application submitted")
                router.push('/browse-jobs')
            }
        }
        else{
            console.log('this user is not a candidate')
        }
    };

    return (
        <Button onClick={handleApplyNow} className={className} size={size}>
            <Send data-icon="inline-start" />
            Apply Now
        </Button>
    );
}
