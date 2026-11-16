"use client";

import { useState } from "react";

const SORT_OPTIONS = [
    "Most Recent",
    "Oldest",
    "Salary: High to Low",
    "Salary: Low to High",
];

export function SortSelect() {
    const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);

    const handleSortChange = (value: string) => {
        setSortBy(value);
        // TODO: add your sorting logic here
    };

    return (
        <label className="flex items-center gap-2 text-xs text-[#777982]">
            Sort by:
            <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-9 rounded-lg border border-white/10 bg-[#131315] px-2.5 text-sm text-[#D4D4D8] transition-colors focus:border-[#6C55EC]/50 focus:outline-none"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}
