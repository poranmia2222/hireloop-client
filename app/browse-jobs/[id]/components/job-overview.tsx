import type { ReactNode } from "react";
import { Users } from "lucide-react";
import type { Job } from "@/types/job";
import { formatDate, formatSalary } from "@/lib/job-format";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ApplyButton } from "./apply-button";

function OverviewRow({ label, value }: { label: string; value: ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </span>
            <span className="text-right text-sm font-medium text-foreground">
                {value}
            </span>
        </div>
    );
}

export function JobOverview({ job }: { job: Job }) {
    console.log(job._id)
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <OverviewRow label="Category" value={job.category} />
                    <OverviewRow label="Job Type" value={job.jobType} />
                    <OverviewRow label="Location" value={job.location} />
                    <OverviewRow label="Salary" value={formatSalary(job)} />
                    <OverviewRow label="Deadline" value={formatDate(job.deadline)} />
                    <OverviewRow
                        label="Applicants"
                        value={
                            <span className="inline-flex items-center gap-1.5">
                                <Users className="size-4 text-muted-foreground" />
                                {job.applicants}
                            </span>
                        }
                    />
                </div>

                <ApplyButton job={job} className="w-full" size="lg" />
            </CardContent>
        </Card>
    );
}
