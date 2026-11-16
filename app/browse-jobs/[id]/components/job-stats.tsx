import type { ElementType } from "react";
import {
    Banknote,
    CalendarDays,
    Clock,
    MapPin,
} from "lucide-react";
import type { Job } from "@/types/job";
import { formatDate, formatSalary } from "@/lib/job-format";

function StatCard({
    icon: Icon,
    label,
    value,
}: {
    icon: ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="size-4" />
                <span className="text-xs font-medium uppercase tracking-wide">
                    {label}
                </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-foreground">
                {value}
            </p>
        </div>
    );
}

export function JobStats({ job }: { job: Job }) {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
                icon={Banknote}
                label="Salary Range"
                value={formatSalary(job)}
            />
            <StatCard icon={MapPin} label="Location" value={job.location} />
            <StatCard icon={Clock} label="Job Type" value={job.jobType} />
            <StatCard
                icon={CalendarDays}
                label="Deadline"
                value={formatDate(job.deadline)}
            />
        </div>
    );
}
