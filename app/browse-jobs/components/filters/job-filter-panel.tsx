"use client";

import {
    FilterChecklist,
    type FilterOption,
} from "./filter-checklist";

const JOB_TYPE_OPTIONS: FilterOption[] = [
    { label: "Full-time", count: "1.2k" },
    { label: "Contract", count: "432" },
    { label: "Freelance", count: "156" },
];

const CATEGORY_OPTIONS: FilterOption[] = [
    { label: "Engineering", count: "845" },
    { label: "Design", count: "312" },
    { label: "Infrastructure", count: "264" },
    { label: "Marketing", count: "198" },
    { label: "Sales", count: "173" },
    { label: "Quality", count: "121" },
];

export function JobFilterPanel() {
    return (
        <aside className="h-fit rounded-xl border border-white/[0.06] bg-[#131315] p-5">
            <h2 className="text-lg font-semibold text-[#F4F4F5]">Filters</h2>

            <FilterChecklist
                title="Job Type"
                name="jobType"
                options={JOB_TYPE_OPTIONS}
            />

            <FilterChecklist
                title="Category"
                name="category"
                options={CATEGORY_OPTIONS}
            />
        </aside>
    );
}
