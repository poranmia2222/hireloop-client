import { BadgeCheck, Bookmark } from "lucide-react";
import type { Job } from "@/types/job";
import { getCategoryStyle } from "@/lib/job-category";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ApplyButton } from "./apply-button";

export function JobDetailsHeader({ job }: { job: Job }) {
    const { icon: CategoryIcon, classes } = getCategoryStyle(job.category);

    return (
        <Card>
            <CardHeader className="sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                    <span
                        className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${classes}`}
                    >
                        <CategoryIcon className="size-6" />
                    </span>
                    <div>
                        <CardTitle className="text-xl font-semibold text-[#F4F4F5] sm:text-2xl">
                            {job.jobTitle}
                        </CardTitle>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span>{job.companyName}</span>
                            <span aria-hidden="true">•</span>
                            <Badge variant="secondary" className="gap-1 rounded-full">
                                <BadgeCheck className="size-3.5" />
                                {job.category}
                            </Badge>
                        </div>
                    </div>
                </div>

                <CardAction className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label={`Save ${job.jobTitle}`}
                    >
                        <Bookmark />
                    </Button>
                    <ApplyButton job={job}/>
                </CardAction>
            </CardHeader>
        </Card>
    );
}
