import type { Job } from "@/types/job";

export function splitSentences(text: string): string[] {
    return text
        .split(/(?<=\.)\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);
}

export function formatSalary(job: Job) {
    const unit =
        job.salaryFrequency === "per hour"
            ? "hr"
            : job.salaryFrequency === "per month"
                ? "mo"
                : "yr";
    return `€${job.minSalary} - €${job.maxSalary} / ${unit}`;
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
