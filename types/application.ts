/**
 * Job application model.
 *
 * One record is created every time a candidate applies to a job
 * (POST `${NEXT_PUBLIC_API_BASE_URL}/application`).
 *
 * Fields needed by the candidate "My Applications" dashboard:
 * job title, company, job type, work mode, applied date, status,
 * plus the Active/Archived tab flag and the stats it aggregates.
 */

export const APPLICATION_STATUSES = [
    "Applied",
    "Review",
    "Shortlisted",
    "Interview",
    "Rejected",
    "Offered",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const WORK_MODES = ["Remote", "On-site", "Hybrid"] as const;

export type WorkMode = (typeof WORK_MODES)[number];

/** Payload sent to the database when the candidate applies. */
export type CreateApplicationInput = {
    jobId: string;
    userId: string;
    email: string;
    /** Snapshot of the job at application time */
    jobTitle: string;
    companyName: string;
    jobType: string;
    workMode: WorkMode;
    location: string;
    /** ISO date string */
    appliedAt: string;
};

/** Full application object as stored in / returned from the database. */
export type Application = CreateApplicationInput & {
    _id: string;
    status: ApplicationStatus;
    /** Active/Archived tab on the applications page */
    archived: boolean;
    /** ISO date string */
    updatedAt: string;
};
