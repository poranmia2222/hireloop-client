import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AdminUser, roleLabel, roleValue } from "@/types/user";
import { UserRowActions } from "./user-actions";

const roleBadge: Record<string, string> = {
    recruiter: "bg-[#6C55EC]/15 text-[#8F88FF]",
    admin: "bg-amber-500/15 text-amber-400",
    candidate: "bg-white/[0.06] text-zinc-300",
};

function formatJoinDate(date?: string | Date) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function initials(name?: string) {
    return (name?.trim() || "?").slice(0, 2);
}

export function UsersTable({ users }: { users: AdminUser[] }) {
    return (
        <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#131315]">
            <Table className="min-w-[900px]">
                <TableHeader>
                    <TableRow className="border-white/[0.06] hover:bg-transparent">
                        {["User Name", "Email Address", "Role", "Join Date", "Status", "Actions"].map(
                            (heading) => (
                                <TableHead
                                    key={heading}
                                    className={`px-5 py-4 text-xs font-medium uppercase tracking-wide text-[#777982] ${
                                        heading === "Actions" ? "text-right" : ""
                                    }`}
                                >
                                    {heading}
                                </TableHead>
                            ),
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => {
                        const suspended = Boolean(user.banned);
                        const role = roleLabel(user.role);
                        const roleKey = roleValue(user.role) || "candidate";

                        return (
                            <TableRow
                                key={user.id}
                                className="border-white/[0.04] hover:bg-white/[0.02]"
                            >
                                {/* User name */}
                                <TableCell className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#6C55EC]/15 text-xs font-semibold uppercase text-[#8F88FF]">
                                            {initials(user.name)}
                                        </span>
                                        <p className="text-sm font-medium text-[#F4F4F5]">
                                            {user.name || "—"}
                                        </p>
                                    </div>
                                </TableCell>

                                {/* Email */}
                                <TableCell className="px-5 py-4 text-sm text-[#D4D4D8]">
                                    {user.email}
                                </TableCell>

                                {/* Role */}
                                <TableCell className="px-5 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${roleBadge[roleKey]}`}
                                    >
                                        {role}
                                    </span>
                                </TableCell>

                                {/* Join date */}
                                <TableCell className="px-5 py-4 text-sm whitespace-nowrap text-[#D4D4D8]">
                                    {formatJoinDate(user.createdAt)}
                                </TableCell>

                                {/* Status */}
                                <TableCell className="px-5 py-4">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                                            suspended
                                                ? "bg-rose-500/10 text-rose-400"
                                                : "bg-emerald-500/10 text-emerald-400"
                                        }`}
                                    >
                                        <span
                                            className={`size-1.5 rounded-full ${
                                                suspended ? "bg-rose-400" : "bg-emerald-400"
                                            }`}
                                        />
                                        {suspended ? "Suspended" : "Active"}
                                    </span>
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="px-5 py-4 text-right">
                                    <UserRowActions user={user} />
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {users.length === 0 && (
                        <TableRow className="border-white/[0.04] hover:bg-transparent">
                            <TableCell
                                colSpan={6}
                                className="px-5 py-10 text-center text-sm text-[#777982]"
                            >
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
