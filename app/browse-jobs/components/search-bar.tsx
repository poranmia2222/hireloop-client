"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries())
        const search = data.searchFiled
        const params = new URLSearchParams()
        params.set('search', search as string)
        router.push(`/browse-jobs?${params.toString()}`)
    }

    return (
        <form
            onSubmit={handleSearch}
            className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-[#131315] p-4 sm:flex-row sm:items-center"
        >
            <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#777982]" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    name="searchFiled"
                    placeholder="Search by job title, keywords..."
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm text-[#F4F4F5] transition-colors placeholder:text-[#777982] focus:border-[#6C55EC]/50 focus:outline-none"
                />
            </div>
            <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[#6C55EC] px-6 text-sm font-medium text-white transition-colors hover:bg-[#5C45D6]"
            >
                Search Jobs
            </button>
        </form>
    );
}
