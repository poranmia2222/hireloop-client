import { getJobs } from "@/lib/api/jobs";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SearchBar } from "./components/search-bar";
import { JobFilterPanel } from "./components/filters/job-filter-panel";
import { SortSelect } from "./components/sort-select";
import { JobCard } from "./components/job-card";
import { Pagination } from "./components/pagination";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BrowseJobsPage({searchParams,}: {searchParams: SearchParams;}) {
    
    const params = await searchParams;
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const jobs = await getJobs(query);

    return (
        <div className="dark min-h-screen bg-[#0A0A0A] text-foreground [background-image:radial-gradient(120%_90%_at_50%_0%,#2A2A2A_0%,#131313_45%,#0A0A0A_100%)]">
            <SiteNavbar />

            <main className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6">
                <SearchBar />

                <div className="mt-6 grid items-start gap-6 lg:grid-cols-[240px_1fr]">
                    <JobFilterPanel />

                    <section>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                            <h1 className="text-xl font-semibold text-[#F4F4F5]">
                                Found {jobs.length} Jobs
                            </h1>
                            <SortSelect />
                        </div>

                        {jobs.length === 0 ? (
                            <p className="rounded-xl border border-white/[0.06] bg-[#131315] p-10 text-center text-sm text-[#777982]">
                                No jobs found. Try adjusting your search or filters.
                            </p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}

                        <Pagination />
                    </section>
                </div>
            </main>
        </div>
    );
}
