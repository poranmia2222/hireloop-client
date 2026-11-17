"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { APPLICATION_STATUSES, Application, ApplicationStatus } from "@/types/application";
import { updateApplicationStatus } from "@/lib/action/application";

export const statusStyles: Record<ApplicationStatus, string> = {
    Applied: "bg-white/[0.06] text-zinc-300",
    Review: "bg-amber-500/10 text-amber-500",
    Shortlisted: "bg-sky-500/10 text-sky-400",
    Interview: "bg-violet-500/10 text-violet-400",
    Rejected: "bg-rose-500/10 text-rose-400",
    Offered: "bg-emerald-500/10 text-emerald-400",
};

const statusBadge = (status: ApplicationStatus) =>
    `inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`;

/** Older application records may have no status (or legacy values like "Under Review"). */
const normalizeStatus = (status: string | undefined): ApplicationStatus =>
    APPLICATION_STATUSES.includes(status as ApplicationStatus)
        ? (status as ApplicationStatus)
        : "Applied";

/**
 * Renders the last two cells of each applications row:
 * - "Status": the current status badge
 * - "Update Status": a dropdown to change the status
 *
 * Pass `onStatusChange` to hook your own logic into status changes.
 * It receives the application and the newly selected status.
 */
export function ApplicationStatusCells({
    application,
    onStatusChange,
}: {
    application: Application;
    /** Called whenever a new status is picked from the dropdown. */
    onStatusChange?: (application: Application, status: ApplicationStatus) => void;
}) {
    const [status, setStatus] = useState(normalizeStatus(application.status));

    const handleStatusChange = async (value: string) => {
        const next = value as ApplicationStatus;
        if (next === status) return;

        setStatus(next);
        onStatusChange?.(application, next);

        try {
            const result = await updateApplicationStatus(application._id, { status: next });
            console.log("updated result:", result);
        } catch (error) {
            console.error("Failed to update application status:", error);
        }
    };

    return (
        <>
            {/* Status (current) */}
            <TableCell className="px-5 py-4">
                <span className={statusBadge(status)}>{status}</span>
            </TableCell>

            {/* Update status */}
            <TableCell className="px-5 py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-[#D4D4D8] outline-none transition-colors hover:border-[#6C55EC]/40 hover:bg-[#6C55EC]/10 data-open:bg-[#6C55EC]/10">
                        Update Status
                        <ChevronDown className="size-3 text-[#8F88FF]" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                        <DropdownMenuRadioGroup
                            value={status}
                            onValueChange={handleStatusChange}
                        >
                            {APPLICATION_STATUSES.map((option) => (
                                <DropdownMenuRadioItem key={option} value={option}>
                                    <span
                                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[option]}`}
                                    >
                                        {option}
                                    </span>
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </>
    );
}
