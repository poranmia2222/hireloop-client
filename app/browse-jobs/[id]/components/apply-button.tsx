'use client'

import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";

export function ApplyButton({className,size = "default", job}: 
    {className?: string;size?: "default" | "lg";
        job:Job
}) {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();
    // console.log(id)

    const handleApplyNow = () => {
        if (!user) {
            router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`);
            return
        }
    };

    return (
        <Button onClick={handleApplyNow} className={className} size={size}>
            <Send data-icon="inline-start" />
            Apply Now
        </Button>
    );
}
