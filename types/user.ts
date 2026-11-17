/** Minimal user shape used by the admin users UI. */
export type AdminUser = {
    id: string;
    name: string;
    email: string;
    /** "candidate" | "recruiter" | "admin" (better-auth additionalField) */
    role?: string | string[];
    /** ISO string or Date (better-auth returns a Date) */
    createdAt?: string | Date;
    /** Set by the better-auth admin plugin (banned = suspended) */
    banned?: boolean;
};

/** Normalize a role value (better-auth may store it as a string or string[]). */
export const roleValue = (role: string | string[] | undefined): string =>
    Array.isArray(role) ? (role[0] ?? "") : (role ?? "");

/** Display label for a role value. */
export const roleLabel = (role: string | string[] | undefined): string => {
    switch (roleValue(role)) {
        case "recruiter":
            return "Recruiter";
        case "admin":
            return "Admin";
        case "candidate":
        default:
            return "Seeker";
    }
};
