'use client'

import type { ElementType, ReactNode } from "react";
import {
    Banknote,
    Bookmark,
    Briefcase,
    Clock,
} from "lucide-react";
import type { Job } from "@/types/job";
import { getCategoryStyle } from "@/lib/job-category";
import { redirect } from "next/navigation";

function formatSalary(job: Job) {
    const unit = job.salaryFrequency === "per hour" ? "hr" : "yr";
    return `€${job.minSalary} - €${job.maxSalary} / ${unit}`;
}

function Chip({ icon: Icon, children }: { icon: ElementType; children: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-[#D4D4D8]">
            <Icon className="size-3.5 text-[#8F88FF]" />
            {children}
        </span>
    );
}

export function JobCard({ job }: { job: Job }) {
    const { icon: CategoryIcon, classes } = getCategoryStyle(job.category);

    const handleViewJobDetails = (jobId:string)=>{
        redirect(`/browse-jobs/${jobId}`)
    }

    return (
        <article onClick={()=>handleViewJobDetails(job._id)} className="rounded-xl border border-white/[0.06] bg-[#131315] p-5 transition-colors hover:border-white/[0.12]">
            <div className="flex items-start gap-4">
                <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${classes}`}
                >
                    <CategoryIcon className="size-5" />
                </span>

                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-[#F4F4F5]">
                        {job.jobTitle}
                    </h3>
                    <p className="mt-0.5 truncate text-sm text-[#777982]">
                        {job.companyName} • {job.location}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Chip icon={Banknote}>{formatSalary(job)}</Chip>
                        <Chip icon={Clock}>{job.jobType}</Chip>
                        <Chip icon={Briefcase}>{job.category}</Chip>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label={`Save ${job.jobTitle}`}
                    className="rounded-lg p-2 text-[#777982] transition-colors hover:bg-white/[0.04] hover:text-[#F4F4F5]"
                >
                    <Bookmark className="size-4" />
                </button>
            </div>
        </article>
    );
}
