import React from "react";
import Link from "next/link";
import {
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Code,
    Cpu,
    Database,
    Download,
    PenTool,
    ServerCog,
} from "lucide-react";
import { getMyApplications } from "@/lib/action/jobs";
import { Application, ApplicationStatus } from "@/types/application";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PAGE_SIZE = 5;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

/* ---------------------------------- helpers ---------------------------------- */

const statusStyles: Record<ApplicationStatus, string> = {
    Applied: "bg-white/[0.06] text-zinc-300",
    Review: "bg-amber-500/10 text-amber-500",
    Shortlisted: "bg-sky-500/10 text-sky-400",
    Interview: "bg-violet-500/10 text-violet-400",
    Rejected: "bg-rose-500/10 text-rose-400",
    Offered: "bg-emerald-500/10 text-emerald-400",
};

const jobIconStyles: Record<string, { icon: React.ElementType; classes: string }> = {
    Code: { icon: Code, classes: "bg-sky-500/15 text-sky-400" },
    PenTool: { icon: PenTool, classes: "bg-orange-500/15 text-orange-400" },
    Database: { icon: Database, classes: "bg-emerald-500/15 text-emerald-400" },
    ServerCog: { icon: ServerCog, classes: "bg-cyan-500/15 text-cyan-400" },
    Cpu: { icon: Cpu, classes: "bg-rose-500/15 text-rose-400" },
    Briefcase: { icon: Briefcase, classes: "bg-zinc-500/15 text-zinc-400" },
};

function getJobIcon(jobTitle: string) {
    const title = jobTitle.toLowerCase();
    if (/frontend|developer|software|engineer/.test(title)) return jobIconStyles.Code;
    if (/design|ux|ui/.test(title)) return jobIconStyles.PenTool;
    if (/data|analyst/.test(title)) return jobIconStyles.Database;
    if (/cloud|devops|architect/.test(title)) return jobIconStyles.ServerCog;
    if (/ai|research|machine/.test(title)) return jobIconStyles.Cpu;
    return jobIconStyles.Briefcase;
}

function formatRelativeTime(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const minutes = Math.floor(diff / 60_000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months === 1 ? "" : "s"} ago`;
}

/* --------------------------------- sub views --------------------------------- */

function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-xl border border-white/[0.06] bg-[#131315] px-5 py-4">
            <p className="text-xs text-[#777982]">{label}</p>
            <p className="mt-1.5 text-2xl font-semibold text-[#F4F4F5]">{value}</p>
        </div>
    );
}

function TabLink({
    href,
    active,
    children,
}: {
    href: string;
    active: boolean;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={`inline-flex h-9 items-center rounded-lg px-4 text-sm font-medium transition-colors ${
                active
                    ? "bg-[#6C55EC] text-white"
                    : "border border-white/10 bg-transparent text-[#777982] hover:text-[#D4D4D8]"
            }`}
        >
            {children}
        </Link>
    );
}

/* ----------------------------------- page ----------------------------------- */

const ApplicationsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const params = await searchParams;
    const tab = params.tab === "archived" ? "archived" : "active";
    const requestedPage = Math.max(1, Number(params.page) || 1);

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const applications: Application[] = await getMyApplications(`applicantId=${session?.user.id}`);

    const filtered = applications.filter((app) => app.archived === (tab === "archived"));

    // Stats are computed on the active list, like the design
    const activeApps = applications.filter((app) => !app.archived);
    const totalApplied = activeApps.length;
    const shortlisted = activeApps.filter((app) => app.status === "Shortlisted").length;
    const interviews = activeApps.filter((app) => app.status === "Interview").length;
    const successCount = activeApps.filter((app) =>
        ["Shortlisted", "Interview", "Offered"].includes(app.status),
    ).length;
    const successRate = totalApplied ? Math.round((successCount / totalApplied) * 100) : 0;

    // Pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const page = Math.min(requestedPage, totalPages);
    const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const first = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const last = Math.min(page * PAGE_SIZE, filtered.length);

    const pageHref = (n: number) =>
        `/dashboard/candidate/applications?tab=${tab}&page=${n}`;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5] sm:text-3xl">
                        My Applications
                    </h1>
                    <p className="mt-1.5 text-sm text-[#777982]">
                        Track your job applications and interview progress in real-time.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1">
                        <TabLink href="/dashboard/candidate/applications?tab=active" active={tab === "active"}>
                            Active
                        </TabLink>
                        <TabLink href="/dashboard/candidate/applications?tab=archived" active={tab === "archived"}>
                            Archived
                        </TabLink>
                    </div>
                    <button
                        type="button"
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#6C55EC] px-4 text-sm font-medium text-white transition-colors hover:bg-[#5C45D6]"
                    >
                        <Download className="size-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Applied" value={totalApplied} />
                <StatCard label="Shortlisted" value={shortlisted} />
                <StatCard label="Interviews" value={interviews} />
                <StatCard label="Success Rate" value={`${successRate}%`} />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#131315]">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                {["Job Title", "Company", "Applied", "Status", "Action"].map(
                                    (heading) => (
                                        <th
                                            key={heading}
                                            className={`px-5 py-4 text-xs font-medium uppercase tracking-wide text-[#777982] ${
                                                heading === "Action" ? "text-right" : ""
                                            }`}
                                        >
                                            {heading}
                                        </th>
                                    ),
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {pageRows.map((app) => {
                                const { icon: Icon, classes } = getJobIcon(app.jobTitle);

                                return (
                                    <tr
                                        key={app._id}
                                        className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.02]"
                                    >
                                        {/* Job title */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${classes}`}
                                                >
                                                    <Icon className="size-4" />
                                                </span>
                                                <div>
                                                    <p className="text-sm font-medium text-[#F4F4F5]">
                                                        {app.jobTitle}
                                                    </p>
                                                    <p className="text-xs text-[#777982]">
                                                        {app.jobType} • {app.workMode}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Company */}
                                        <td className="px-5 py-4 text-sm text-[#D4D4D8]">
                                            {app.companyName}
                                        </td>

                                        {/* Applied */}
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-[#777982]">
                                            {formatRelativeTime(app.appliedAt)}
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[app.status]}`}
                                            >
                                                {app.status}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-5 py-4 text-right">
                                            <Link
                                                href={`/browse-jobs/${app.jobId}`}
                                                className="text-sm font-medium text-[#8F88FF] transition-colors hover:text-[#6C55EC]"
                                            >
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}

                            {pageRows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-10 text-center text-sm text-[#777982]"
                                    >
                                        No {tab} applications.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-3.5">
                    <p className="text-sm text-[#777982]">
                        Showing {first}-{last} of {filtered.length} applications
                    </p>
                    {totalPages > 1 && (
                        <nav aria-label="Applications pagination" className="flex items-center gap-1.5">
                            {page > 1 && (
                                <Link
                                    href={pageHref(page - 1)}
                                    aria-label="Previous page"
                                    className="flex size-9 items-center justify-center rounded-lg text-[#D4D4D8] transition-colors hover:bg-white/[0.04]"
                                >
                                    <ChevronLeft className="size-4" />
                                </Link>
                            )}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <Link
                                    key={n}
                                    href={pageHref(n)}
                                    aria-current={n === page ? "page" : undefined}
                                    className={`flex size-9 items-center justify-center rounded-lg text-sm transition-colors ${
                                        n === page
                                            ? "bg-[#6C55EC] text-white"
                                            : "text-[#D4D4D8] hover:bg-white/[0.04]"
                                    }`}
                                >
                                    {n}
                                </Link>
                            ))}
                            {page < totalPages && (
                                <Link
                                    href={pageHref(page + 1)}
                                    aria-label="Next page"
                                    className="flex size-9 items-center justify-center rounded-lg text-[#D4D4D8] transition-colors hover:bg-white/[0.04]"
                                >
                                    <ChevronRight className="size-4" />
                                </Link>
                            )}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationsPage;
