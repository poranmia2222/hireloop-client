import { Separator } from "@/components/ui/separator";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Job } from "@/types/job";
import { splitSentences } from "@/lib/job-format";

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

export function JobDescription({ job }: { job: Job }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <section>
                    <h3 className="mb-3 text-base font-semibold text-foreground">
                        Responsibilities
                    </h3>
                    <BulletList items={splitSentences(job.responsibilities)} />
                </section>

                <Separator />

                <section>
                    <h3 className="mb-3 text-base font-semibold text-foreground">
                        Qualifications
                    </h3>
                    <BulletList items={splitSentences(job.qualifications)} />
                </section>
            </CardContent>
        </Card>
    );
}
