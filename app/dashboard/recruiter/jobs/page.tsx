import React from "react";
import Link from "next/link";
import {
    Briefcase,
    ChevronRight,
    Code,
    Globe,
    Megaphone,
    Pencil,
    PenTool,
    Plus,
    ServerCog,
    Settings,
    TrendingUp,
    Trash2,
    Users,
    EllipsisVertical,
} from "lucide-react";
import { getJobs } from "@/lib/api/jobs";
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";

type Job = {
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
    responsibilities: string;
    qualifications: string;
    applicants: number;
};



const categoryStyles: Record<string, { icon: React.ElementType; classes: string }> = {
    Engineering: { icon: Code, classes: "bg-sky-500/15 text-sky-400" },
    Design: { icon: PenTool, classes: "bg-orange-500/15 text-orange-400" },
    Infrastructure: { icon: ServerCog, classes: "bg-cyan-500/15 text-cyan-400" },
    Marketing: { icon: Megaphone, classes: "bg-violet-500/15 text-violet-400" },
    Sales: { icon: TrendingUp, classes: "bg-amber-500/15 text-amber-400" },
    Quality: { icon: Settings, classes: "bg-rose-500/15 text-rose-400" },
};

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDeadline(deadline: string) {
    const [year, month, day] = deadline.split("-").map(Number);
    if (!year || !month || !day) return deadline;
    return `${MONTHS[month - 1]} ${day}, ${year}`;
}

function formatCompensation(job: Job) {
    const unit = job.salaryFrequency === "per hour" ? "hr" : "yr";
    return `€${job.minSalary} – €${job.maxSalary} / ${unit}`;
}

function getStatus(job: Job): "Active" | "Expired" {
    const now = new Date();
    const deadline = new Date(`${job.deadline}T23:59:59Z`);
    return now <= deadline ? "Active" : "Expired";
}

const ManageJobs = async () => {
    const jobsData:Job[] = await getJobs()
    console.log(jobsData)
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-2 flex items-center gap-1.5 text-sm">
                <Link
                    href="/dashboard/recruiter"
                    className="text-[#777982] transition-colors hover:text-[#D4D4D8]"
                >
                    Manage Jobs
                </Link>
                <ChevronRight className="size-3.5 text-[#55565E]" />
                <span className="text-[#8F88FF]">Job Listings &amp; Postings</span>
            </nav>

            {/* Header */}
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5] sm:text-3xl">
                        Manage Job Posts
                    </h1>
                    <p className="mt-1.5 text-sm text-[#777982]">
                        Review live listings, monitor applicants, and update job details across your organization.
                    </p>
                </div>
                <Link
                    href="/dashboard/recruiter/jobs/new"
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#6C55EC] px-4 text-sm font-medium text-white transition-colors hover:bg-[#5C45D6]"
                >
                    <Plus className="size-4" />
                    New Job Post
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#131315]">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] text-left">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                {[
                                    "Job Title & Dept",
                                    "Company & Location",
                                    "Type",
                                    "Compensation",
                                    "Applicants",
                                    "Status",
                                    "Deadline",
                                    "Actions",
                                ].map((heading) => (
                                    <th
                                        key={heading}
                                        className={`px-5 py-4 text-xs font-medium tracking-wide text-[#777982] uppercase ${heading === "Actions" ? "text-right" : ""
                                            }`}
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {jobsData.map((job) => {
                                const status = getStatus(job);
                                const category = categoryStyles[job.category] ?? {
                                    icon: Briefcase,
                                    classes: "bg-zinc-500/15 text-zinc-400",
                                };
                                const CategoryIcon = category.icon;

                                return (
                                    <tr
                                        key={job._id}
                                        className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.02]"
                                    >
                                        {/* Job title & dept */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${category.classes}`}
                                                >
                                                    <CategoryIcon className="size-4" />
                                                </span>
                                                <div>
                                                    <p className="text-sm font-medium text-[#F4F4F5]">
                                                        {job.jobTitle}
                                                    </p>
                                                    <p className="text-xs text-[#777982]">
                                                        {job.category}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Company & location */}
                                        <td className="px-5 py-4">
                                            <p className="text-sm text-[#D4D4D8]">{job.companyName}</p>
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-[#777982]">
                                                <Globe className="size-3" />
                                                {job.location}
                                            </p>
                                        </td>

                                        {/* Type */}
                                        <td className="px-5 py-4">
                                            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-[#D4D4D8]">
                                                {job.jobType}
                                            </span>
                                        </td>

                                        {/* Compensation */}
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-[#D4D4D8]">
                                            {formatCompensation(job)}
                                        </td>

                                        {/* Applicants */}
                                        <td className="px-5 py-4">
                                            <span className="flex items-center gap-2 text-sm text-[#D4D4D8]">
                                                <Users className="size-4 text-[#777982]" />
                                                {job.applicants} Candidates
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status === "Active"
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : "bg-white/[0.05] text-[#777982]"
                                                    }`}
                                            >
                                                <span
                                                    className={`size-1.5 rounded-full ${status === "Active"
                                                            ? "bg-emerald-400"
                                                            : "bg-[#777982]"
                                                        }`}
                                                />
                                                {status}
                                            </span>
                                        </td>

                                        {/* Deadline */}
                                        <td className="px-5 py-4">
                                            <p className="text-sm whitespace-nowrap text-[#D4D4D8]">
                                                {formatDeadline(job.deadline)}
                                            </p>
                                            <p className="mt-0.5 text-xs text-[#777982]">
                                                {status === "Active" ? "Accepting applications" : "Closed"}
                                            </p>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-[#D4D4D8] transition-colors hover:border-[#6C55EC]/40 hover:bg-[#6C55EC]/10"
                                                >
                                                    <Pencil className="size-3.5 text-[#8F88FF]" />
                                                    Update
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label="Delete job"
                                                    
                                                >
                                                    <DeleteJobDialog job={job}></DeleteJobDialog>
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label="More options"
                                                    className="flex size-8 items-center justify-center rounded-lg text-[#777982] transition-colors hover:bg-white/[0.04] hover:text-[#D4D4D8]"
                                                >
                                                    <EllipsisVertical className="size-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageJobs;
