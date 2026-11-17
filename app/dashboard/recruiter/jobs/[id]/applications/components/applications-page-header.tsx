import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ApplicationsPageHeader({
    jobTitle,
    companyName,
    location,
}: {
    jobTitle: string;
    companyName: string;
    location: string;
}) {
    return (
        <div className="mb-8">
            {/* Breadcrumb */}
            <nav className="mb-2 flex items-center gap-1.5 text-sm">
                <Link
                    href="/dashboard/recruiter/jobs"
                    className="text-[#777982] transition-colors hover:text-[#D4D4D8]"
                >
                    Manage Jobs
                </Link>
                <ChevronRight className="size-3.5 text-[#55565E]" />
                <span className="text-[#8F88FF]">Candidates</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5] sm:text-3xl">
                    {jobTitle}
                </h1>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-[#D4D4D8]">
                    {companyName}
                </span>
                <span className="text-sm text-[#777982]">{location}</span>
            </div>
            <p className="mt-1.5 text-sm text-[#777982]">
                Everyone who applied for this job posting.
            </p>
        </div>
    );
}
