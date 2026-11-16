import type { Application } from "@/types/application";

/**
 * Dummy data for the candidate "My Applications" page.
 * TODO: remove once applications are loaded from the real API.
 */

const now = Date.now();
const daysAgo = (days: number, hours = 0) =>
    new Date(now - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000).toISOString();

type DummyApplication = Omit<Application, "_id" | "updatedAt">;

const dummyRows: DummyApplication[] = [
    {
        jobId: "job-1",
        userId: "user_1",
        email: "candidate@hireloop.com",
        jobTitle: "Senior Frontend Engineer",
        companyName: "Stark Industries",
        jobType: "Full-time",
        workMode: "Remote",
        location: "Remote",
        status: "Applied",
        archived: false,
        appliedAt: daysAgo(0, 2),
    },
    {
        jobId: "job-2",
        userId: "user_1",
        email: "candidate@hireloop.com",
        jobTitle: "Product Designer",
        companyName: "Cyberdyne Systems",
        jobType: "Contract",
        workMode: "Hybrid",
        location: "Austin, TX",
        status: "Review",
        archived: false,
        appliedAt: daysAgo(1),
    },
    {
        jobId: "job-3",
        userId: "user_1",
        email: "candidate@hireloop.com",
        jobTitle: "Lead Data Scientist",
        companyName: "Wayne Enterprises",
        jobType: "Full-time",
        workMode: "On-site",
        location: "Gotham, NJ",
        status: "Shortlisted",
        archived: false,
        appliedAt: daysAgo(4),
    },
    {
        jobId: "job-4",
        userId: "user_1",
        email: "candidate@hireloop.com",
        jobTitle: "Cloud Architect",
        companyName: "Oscorp Tech",
        jobType: "Full-time",
        workMode: "Remote",
        location: "Remote",
        status: "Rejected",
        archived: false,
        appliedAt: daysAgo(7),
    },
    {
        jobId: "job-5",
        userId: "user_1",
        email: "candidate@hireloop.com",
        jobTitle: "AI Research Engineer",
        companyName: "Hooil Corp",
        jobType: "Full-time",
        workMode: "Hybrid",
        location: "San Francisco, CA",
        status: "Offered",
        archived: false,
        appliedAt: daysAgo(14),
    },
    {
        jobId: "job-6",
        userId: "user_1",
        email: "candidate@hireloop.com",
        jobTitle: "DevOps Engineer",
        companyName: "Soylent Systems",
        jobType: "Part-time",
        workMode: "Remote",
        location: "Remote",
        status: "Applied",
        archived: false,
        appliedAt: daysAgo(18),
    },
    {
        jobId: "job-7",
        userId: "user_1",
        email: "candidate@hireloop.com",
        jobTitle: "Marketing Analyst",
        companyName: "Aperture Labs",
        jobType: "Full-time",
        workMode: "On-site",
        location: "New York, NY",
        status: "Interview",
        archived: false,
        appliedAt: daysAgo(25),
    },
    {
        jobId: "job-8",
        userId: "user_1",
        email: "candidate@hireloop.com",
        jobTitle: "QA Tester",
        companyName: "Umbrella Corp",
        jobType: "Internship",
        workMode: "Hybrid",
        location: "Chicago, IL",
        status: "Rejected",
        archived: true,
        appliedAt: daysAgo(40),
    },
];

export const dummyApplications: Application[] = dummyRows.map((row, index) => ({
    ...row,
    _id: `app-${index + 1}`,
    updatedAt: row.appliedAt,
}));
