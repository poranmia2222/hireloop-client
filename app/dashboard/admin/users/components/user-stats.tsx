import React from "react";
import { Card } from "@/components/ui/card";
import { AdminUser } from "@/types/user";

type Stat = {
    label: string;
    value: number | string;
    sub: string;
    subClass: string;
};

export function UserStats({ users }: { users: AdminUser[] }) {
    const active = users.filter((u) => !u.banned).length;
    const recruiters = users.filter((u) => u.role === "recruiter").length;
    const suspended = users.length - active;
    const signups = users.filter(
        (u) => u.createdAt && Date.now() - new Date(u.createdAt).getTime() < 24 * 60 * 60 * 1000,
    ).length;
    const suspendedPct = users.length
        ? Math.round((suspended / users.length) * 1000) / 10
        : 0;

    const stats: Stat[] = [
        { label: "Total Active Users", value: active.toLocaleString(), sub: "Non-suspended accounts", subClass: "text-emerald-400" },
        { label: "Recruiter Growth", value: recruiters.toLocaleString(), sub: "Recruiters on the platform", subClass: "text-emerald-400" },
        { label: "Suspended Accounts", value: suspended.toLocaleString(), sub: `${suspendedPct}% of total`, subClass: "text-[#777982]" },
        { label: "New Signups (24h)", value: signups.toLocaleString(), sub: "Steady activity", subClass: "text-amber-400" },
    ];

    return (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="rounded-xl border-white/[0.06] bg-[#131315] ring-0">
                    <div className="px-5">
                        <p className="text-xs text-[#777982]">{stat.label}</p>
                        <p className="mt-1.5 text-2xl font-semibold text-[#F4F4F5]">{stat.value}</p>
                        <p className={`mt-1 text-xs ${stat.subClass}`}>{stat.sub}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
}
