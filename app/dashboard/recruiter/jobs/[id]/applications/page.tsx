import React from "react";
import { notFound } from "next/navigation";
import { getJobById } from "@/lib/api/jobs";
import { getJobApplications } from "@/lib/api/applications";
import { ApplicationsPageHeader } from "./components/applications-page-header";
import { ApplicationStats } from "./components/application-stats";
import { ApplicationsTable } from "./components/applications-table";

const JobApplicationsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    // The API has no single-job endpoint, so getJobById resolves from the list.
    const job = await getJobById(id);
    if (!job) notFound();

    const applications = await getJobApplications(id);
    console.log(applications)

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <ApplicationsPageHeader
                jobTitle={job.jobTitle}
                companyName={job.companyName}
                location={job.location}
            />

            <ApplicationStats applications={applications} />

            <ApplicationsTable id={id} applications={applications} />
        </div>
    );
};

export default JobApplicationsPage;
