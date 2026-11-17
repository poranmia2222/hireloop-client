"use client";

import React from "react";
import { Ban, ChevronDown, CircleCheck, UserRound, UsersRound, Shield } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminUser, roleValue } from "@/types/user";
import { updateUserRole } from "@/lib/action/users";

/** Role options for the per-row dropdown. */
const ROLE_OPTIONS = [
    { value: "candidate", label: "Make Candidate", icon: UserRound },
    { value: "recruiter", label: "Make Recruiter", icon: UsersRound },
    { value: "admin", label: "Make Admin", icon: Shield },
];

/**
 * Per-row action buttons (role dropdown, suspend/activate, delete).
 * All handlers are intentionally empty — wire them up yourself.
 */
export function UserRowActions({ user }: { user: AdminUser }) {
    const isSuspended = Boolean(user.banned);

    const handleRoleChange = async(role: string) => {
        // TODO: implement role change logic (receives the selected role)
        console.log(role)
        const res = await updateUserRole(user.id, role)
        console.log('res after up',res)
    };

    return (
        <div className="flex items-center justify-end gap-4">
            {/* Role dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-[#D4D4D8] outline-none transition-colors hover:border-[#6C55EC]/40 hover:bg-[#6C55EC]/10 data-open:bg-[#6C55EC]/10">
                    Change Role
                    <ChevronDown className="size-3 text-[#8F88FF]" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                    <DropdownMenuRadioGroup
                        value={roleValue(user.role)}
                        onValueChange={handleRoleChange}
                    >
                        {ROLE_OPTIONS.map(({ value, label, icon: Icon }) => (
                            <DropdownMenuRadioItem key={value} value={value}>
                                <span className="flex items-center gap-2 text-sm text-[#D4D4D8]">
                                    <Icon className="size-4 text-[#777982]" />
                                    {label}
                                </span>
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Suspend / Activate */}
            <button
                type="button"
                onClick={() => {
                    // TODO: suspend / activate user
                }}
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80 ${
                    isSuspended ? "text-emerald-400" : "text-rose-400"
                }`}
            >
                {isSuspended ? (
                    <>
                        <CircleCheck className="size-4" />
                        Activate
                    </>
                ) : (
                    <>
                        <Ban className="size-4" />
                        Suspend
                    </>
                )}
            </button>

            {/* Delete */}
            <button
                type="button"
                onClick={() => {
                    // TODO: delete user
                }}
                className="text-sm font-medium text-rose-400 transition-opacity hover:opacity-80"
            >
                Delete
            </button>
        </div>
    );
}
