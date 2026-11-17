import React from "react";
import { Card } from "@/components/ui/card";
import { ApplicationStatus, Application } from "@/types/application";

type Stat = {
    label: string;
    value: number;
    accent: string;
};

const STAT_CONFIG: Array<{
    label: string;
    statuses: ApplicationStatus[];
    accent: string;
}> = [
    { label: "Total Candidates", statuses: [], accent: "text-[#F4F4F5]" },
    { label: "Shortlisted", statuses: ["Shortlisted"], accent: "text-sky-400" },
    { label: "Interviews", statuses: ["Interview"], accent: "text-violet-400" },
    { label: "Offers", statuses: ["Offered"], accent: "text-emerald-400" },
];

export function ApplicationStats({ applications }: { applications: Application[] }) {
    const stats: Stat[] = STAT_CONFIG.map(({ label, statuses, accent }) => ({
        label,
        accent,
        value: statuses.length
            ? applications.filter((app) => statuses.includes(app.status)).length
            : applications.length,
    }));

    return (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="rounded-xl border-white/[0.06] bg-[#131315] ring-0">
                    <div className="px-5">
                        <p className="text-xs text-[#777982]">{stat.label}</p>
                        <p className={`mt-1.5 text-2xl font-semibold ${stat.accent}`}>
                            {stat.value}
                        </p>
                    </div>
                </Card>
            ))}
        </div>
    );
}
