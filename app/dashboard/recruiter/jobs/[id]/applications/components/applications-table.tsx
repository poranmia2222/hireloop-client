import React from "react";
import { Users } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Application } from "@/types/application";
import { ApplicationStatusCells } from "./application-status";

function formatAppliedDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export function ApplicationsTable({ id, applications }: { id: string; applications: Application[] }) {
    return (
        <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#131315]">
            <Table className="min-w-[900px]">
                <TableHeader>
                    <TableRow className="border-white/[0.06] hover:bg-transparent">
                        {[
                            "Candidate",
                            "Job Type",
                            "Work Mode",
                            "Applied",
                            "Status",
                            "Update Status",
                        ].map(
                            (heading) => (
                                <TableHead
                                    key={heading}
                                    className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-[#777982]"
                                >
                                    {heading}
                                </TableHead>
                            ),
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((app) => (
                        <TableRow
                            key={app._id}
                            className="border-white/[0.04] hover:bg-white/[0.02]"
                        >
                            {/* Candidate */}
                            <TableCell className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6C55EC]/15 text-xs font-semibold uppercase text-[#8F88FF]">
                                        {app.email.slice(0, 2)}
                                    </span>
                                    <p className="text-sm text-[#D4D4D8]">{app.email}</p>
                                </div>
                            </TableCell>

                            {/* Job type */}
                            <TableCell className="px-5 py-4 text-sm text-[#D4D4D8]">
                                {app.jobType}
                            </TableCell>

                            {/* Work mode */}
                            <TableCell className="px-5 py-4 text-sm text-[#D4D4D8]">
                                {app.workMode}
                            </TableCell>

                            {/* Applied */}
                            <TableCell className="px-5 py-4 text-sm whitespace-nowrap text-[#777982]">
                                {formatAppliedDate(app.appliedAt)}
                            </TableCell>

                            {/* Status + Update status (last two cells) */}
                            <ApplicationStatusCells application={app} />
                        </TableRow>
                    ))}

                    {applications.length === 0 && (
                        <TableRow className="border-white/[0.04] hover:bg-transparent">
                            <TableCell
                                colSpan={6}
                                className="px-5 py-10 text-center text-sm text-[#777982]"
                            >
                                <span className="flex flex-col items-center gap-2">
                                    <Users className="size-6 text-[#55565E]" />
                                    No candidates have applied for this job yet.
                                </span>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
