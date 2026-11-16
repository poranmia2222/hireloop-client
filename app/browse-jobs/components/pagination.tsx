"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Demo page count until pagination is wired to real data.
const TOTAL_PAGES = 5;

const baseButtonClass =
    "flex size-9 items-center justify-center rounded-lg text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40";

function PageButton({
    children,
    active = false,
    disabled = false,
    onClick,
    label,
}: {
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    label: string;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            aria-current={active ? "page" : undefined}
            disabled={disabled}
            onClick={onClick}
            className={`${baseButtonClass} ${
                active
                    ? "bg-[#6C55EC] text-white"
                    : "text-[#D4D4D8] hover:bg-white/[0.04]"
            }`}
        >
            {children}
        </button>
    );
}

export function Pagination() {
    const [page, setPage] = useState(1);
    const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

    return (
        <nav
            aria-label="Jobs pagination"
            className="mt-8 flex items-center justify-center gap-1.5"
        >
            <PageButton
                label="Previous page"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
                <ChevronLeft className="size-4" />
            </PageButton>

            {pages.map((n) => (
                <PageButton
                    key={n}
                    label={`Page ${n}`}
                    active={n === page}
                    onClick={() => setPage(n)}
                >
                    {n}
                </PageButton>
            ))}

            <PageButton
                label="Next page"
                disabled={page === TOTAL_PAGES}
                onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            >
                <ChevronRight className="size-4" />
            </PageButton>
        </nav>
    );
}
