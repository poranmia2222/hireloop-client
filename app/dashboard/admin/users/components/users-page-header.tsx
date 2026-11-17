"use client";

import React from "react";
import { ChevronDown, Download } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UsersPageHeader() {
    return (
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5] sm:text-3xl">
                    User Management
                </h1>
                <p className="mt-1.5 text-sm text-[#777982]">
                    Review, filter, and manage platform access for all users.
                </p>
            </div>

            <div className="flex items-center gap-2">
                {/* Role filter (no logic yet) */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-[#D4D4D8] outline-none transition-colors hover:bg-white/[0.06] data-open:bg-white/[0.06]">
                        All Roles
                        <ChevronDown className="size-4 text-[#777982]" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup
                            value="all"
                            onValueChange={() => {
                                // TODO: filter users by role
                            }}
                        >
                            <DropdownMenuRadioItem value="all">All Roles</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="seeker">Seekers</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="recruiter">Recruiters</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="admin">Admins</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    type="button"
                    className="h-10 gap-2 rounded-lg bg-[#6C55EC] px-4 text-sm font-medium text-white hover:bg-[#5C45D6]"
                    onClick={() => {
                        // TODO: export users list
                    }}
                >
                    <Download className="size-4" />
                    Export List
                </Button>
            </div>
        </div>
    );
}
