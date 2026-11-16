import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getJobById } from "@/lib/api/jobs";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { JobDetailsHeader } from "./components/job-details-header";
import { JobStats } from "./components/job-stats";
import { JobDescription } from "./components/job-description";
import { JobOverview } from "./components/job-overview";

export default async function JobDetailsPage({ params, }: { params: Promise<{ id: string }>; }) {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
        notFound();
    }
    console.log(job._id)
    return (
        <div className="dark min-h-screen bg-[#0A0A0A] text-foreground [background-image:radial-gradient(120%_90%_at_50%_0%,#2A2A2A_0%,#131313_45%,#0A0A0A_100%)]">
            <SiteNavbar />

            <main className="mx-auto max-w-7xl space-y-6 px-4 pt-6 pb-16 sm:px-6">
                <Link
                    href="/browse-jobs"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Back to Jobs
                </Link>

                <JobDetailsHeader job={job} />

                <JobStats job={job} />

                <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
                    <JobDescription job={job} />
                    <JobOverview job={job} />
                </div>
            </main>
        </div>
    );
}
