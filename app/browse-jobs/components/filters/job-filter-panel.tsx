"use client";

import { useState } from "react";
import {
    ALL_OPTION_VALUE,
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
    const [jobType, setJobType] = useState(ALL_OPTION_VALUE);
    const [category, setCategory] = useState(ALL_OPTION_VALUE);

    const handleJobTypeChange = (
        type: string,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setJobType(type);
        // TODO: add your filtering logic here
        // You can access the input value via event.target.value
    };

    const handleCategoryChange = (
        next: string,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCategory(next);
        // TODO: add your filtering logic here
        // You can access the input value via event.target.value
    };

    return (
        <aside className="h-fit rounded-xl border border-white/[0.06] bg-[#131315] p-5">
            <h2 className="text-lg font-semibold text-[#F4F4F5]">Filters</h2>

            <FilterChecklist
                title="Job Type"
                name="jobType"
                value={jobType}
                options={JOB_TYPE_OPTIONS}
                onChange={handleJobTypeChange}
            />

            <FilterChecklist
                title="Category"
                name="category"
                value={category}
                options={CATEGORY_OPTIONS}
                onChange={handleCategoryChange}
            />
        </aside>
    );
}
