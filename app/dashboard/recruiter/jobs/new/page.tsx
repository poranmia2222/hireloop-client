"use client"

import { useActionState } from "react"
import Link from "next/link"
import {
    ArrowRight,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    Euro,
    Globe2,
    MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createJob, type JobFormState } from "./actions"

const initialState: JobFormState = { status: "idle", message: "" }

const fieldClassName =
    "h-10 rounded-lg border-white/10 bg-[#1B1B1E] text-sm text-[#F4F4F5] placeholder:text-[#777982] focus-visible:border-[#6C55EC] focus-visible:ring-[#6C55EC]/25"

const textareaClassName =
    "w-full rounded-lg border border-white/10 bg-[#1B1B1E] px-3 py-2.5 text-sm text-[#F4F4F5] outline-none placeholder:text-[#777982] focus-visible:border-[#6C55EC] focus-visible:ring-3 focus-visible:ring-[#6C55EC]/25"

function Field({
    label,
    htmlFor,
    required = false,
    children,
}: {
    label: string
    htmlFor: string
    required?: boolean
    children: React.ReactNode
}) {
    return (
        <div className="flex min-w-0 flex-col gap-2">
            <Label htmlFor={htmlFor} className="text-xs font-medium text-[#D4D4D8]">
                {label}
                {required && <span className="ml-1 text-[#8F88FF]">*</span>}
            </Label>
            {children}
        </div>
    )
}

function Section({
    number,
    title,
    children,
}: {
    number: number
    title: string
    children: React.ReactNode
}) {
    return (
        <section className="rounded-xl border border-white/[0.04] bg-[#131315] p-5 sm:p-6">
            <h2 className="mb-5 flex items-center gap-2 text-sm font-medium text-[#F4F4F5]">
                <span className="size-1.5 rounded-full bg-[#6C55EC]" />
                {number}. {title}
            </h2>
            {children}
        </section>
    )
}

export default function NewJobPage() {
    const [state, formAction, pending] = useActionState(createJob, initialState)

    const handleFormSubmite = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const jobData = Object.fromEntries(formData.entries())
        // fetch("http://localhost:5000/jobs", {
        //     method: "POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify(jobData)
        // })
        // .then((res)=>{

        // })
    }

    return (
        <form onSubmit={handleFormSubmite} className="mx-auto w-full max-w-5xl">
            <div className="mb-6 flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="mb-2 text-xs text-[#8B8D95]">
                        <Link
                            href="/dashboard/recruiter/jobs"
                            className="transition-colors hover:text-white"
                        >
                            Manage Jobs
                        </Link>
                        <span className="mx-2">›</span>
                        <span className="text-[#C4C4CC]">Create New Listing</span>
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5]">
                        Post a New Job
                    </h1>
                    <p className="mt-1 text-sm text-[#92949C]">
                        Fill in the position details to attract qualified talent across our network.
                    </p>
                </div>
            </div>

            <div className="space-y-5">

                {/* 1. Basic Information */}

                <Section number={1} title="Basic Information">
                    <div className="space-y-4">
                        <Field label="Job Title" htmlFor="jobTitle" required>
                            <Input
                                id="jobTitle"
                                name="jobTitle"
                                placeholder="e.g. Frontend Developer"
                                required
                                className={fieldClassName}
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Company Name" htmlFor="companyName" required>
                                <div className="relative">
                                    <Building2 className="pointer-events-none absolute top-3 left-3 size-4 text-[#92949C]" />
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        placeholder="Your company"
                                        required
                                        className={`${fieldClassName} pl-9`}
                                    />
                                </div>
                            </Field>
                            <Field label="Job Category" htmlFor="category" required>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    defaultValue=""
                                    className={`${fieldClassName} w-full rounded-lg border px-3`}
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    <option>Engineering &amp; Tech</option>
                                    <option>Design</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                    <option>Finance</option>
                                    <option>Human Resources</option>
                                    <option>Other</option>
                                </select>
                            </Field>
                        </div>


                        {/* Job Type  */}
                        <fieldset>
                            <legend className="mb-2 text-xs font-medium text-[#D4D4D8]">
                                Job Type <span className="ml-1 text-[#8F88FF]">*</span>
                            </legend>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                {["Full-time", "Part-time", "Contract", "Internship"].map(
                                    (jobType, index) => (
                                        <label
                                            key={jobType}
                                            className="flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#1B1B1E] text-xs text-[#A1A4AA] transition-colors has-checked:border-[#6C55EC] has-checked:text-white hover:border-white/20"
                                        >
                                            <input
                                                type="radio"
                                                name="jobType"
                                                value={jobType}
                                                required={index === 0}
                                                defaultChecked={index === 0}
                                                className="sr-only"
                                            />
                                            {jobType}
                                        </label>
                                    ),
                                )}
                            </div>
                        </fieldset>
                    </div>
                </Section>

                {/* 2. Location, Compensation & Timeline */}

                <Section number={2} title="Location, Compensation & Timeline">
                    <div className="space-y-4">

                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/[0.06] bg-[#1B1B1E] p-3.5">
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#5C53FE]/15 text-[#9A94FF]">
                                <Globe2 className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-xs font-medium text-[#F4F4F5]">
                                    Remote Work Allowed
                                </span>
                                <span className="mt-0.5 block text-xs text-[#92949C]">
                                    Let candidates know they can work remotely.
                                </span>
                            </span>
                            <input
                                type="checkbox"
                                name="remote"
                                value="true"
                                className="size-4 accent-[#6C55EC]"
                            />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Job Location" htmlFor="location" required>
                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute top-3 left-3 size-4 text-[#92949C]" />
                                    <Input
                                        id="location"
                                        name="location"
                                        placeholder="e.g. New York, USA"
                                        required
                                        className={`${fieldClassName} pl-9`}
                                    />
                                </div>
                            </Field>
                            <Field label="Application Deadline" htmlFor="deadline">
                                <div className="relative">
                                    <CalendarDays className="pointer-events-none absolute top-3 left-3 size-4 text-[#92949C]" />
                                    <Input
                                        id="deadline"
                                        name="deadline"
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        className={`${fieldClassName} pl-9`}
                                    />
                                </div>
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field label="Min Salary / Rate" htmlFor="minSalary">
                                <div className="relative">
                                    <Euro className="pointer-events-none absolute top-3 left-3 size-4 text-[#92949C]" />
                                    <Input
                                        id="minSalary"
                                        name="minSalary"
                                        type="number"
                                        min="0"
                                        step="any"
                                        placeholder="e.g. 25"
                                        className={`${fieldClassName} pl-9`}
                                    />
                                </div>
                            </Field>
                            <Field label="Max Salary / Rate" htmlFor="maxSalary">
                                <div className="relative">
                                    <Euro className="pointer-events-none absolute top-3 left-3 size-4 text-[#92949C]" />
                                    <Input
                                        id="maxSalary"
                                        name="maxSalary"
                                        type="number"
                                        min="0"
                                        step="any"
                                        placeholder="e.g. 40"
                                        className={`${fieldClassName} pl-9`}
                                    />
                                </div>
                            </Field>
                            <Field label="Frequency" htmlFor="salaryFrequency">
                                <select
                                    id="salaryFrequency"
                                    name="salaryFrequency"
                                    defaultValue="per year"
                                    className={`${fieldClassName} w-full rounded-lg border px-3`}
                                >
                                    <option>per year</option>
                                    <option>per month</option>
                                    <option>per week</option>
                                    <option>per day</option>
                                    <option>per hour</option>
                                </select>
                            </Field>
                        </div>
                    </div>
                </Section>

                {/* 3. Responsibilities & Requirements */}

                <Section number={3} title="Responsibilities & Requirements">
                    <div className="space-y-4">
                        <Field label="Key Responsibilities" htmlFor="responsibilities" required>
                            <textarea
                                id="responsibilities"
                                name="responsibilities"
                                rows={4}
                                required
                                placeholder="Describe the main responsibilities for this role."
                                className={textareaClassName}
                            />
                        </Field>
                        <Field label="Qualifications & Requirements" htmlFor="qualifications" required>
                            <textarea
                                id="qualifications"
                                name="qualifications"
                                rows={4}
                                required
                                placeholder="List the skills, experience, and qualifications candidates need."
                                className={textareaClassName}
                            />
                        </Field>
                    </div>
                </Section>

                {state.message && (
                    <p
                        role={state.status === "error" ? "alert" : "status"}
                        className={`rounded-lg border px-4 py-3 text-sm ${state.status === "error"
                            ? "border-red-400/20 bg-red-400/10 text-red-300"
                            : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            }`}
                    >
                        {state.message}
                    </p>
                )}



                {/* form buttons */}
                <div className="flex flex-col-reverse justify-end gap-3 pb-4 sm:flex-row">
                    <Button
                        render={<Link href="/dashboard/recruiter/jobs" />}
                        variant="outline"
                        className="h-10 border-white/10 text-[#D4D4D8] hover:bg-[#1B1B1E] hover:text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={pending}
                        className="h-10 rounded-lg bg-[#5C53FE] px-5 text-white hover:bg-[#7169FF]"
                    >
                        <BriefcaseBusiness className="size-4" />
                        {pending ? "Publishing..." : "Publish Job"}
                        <ArrowRight className="size-4" />
                    </Button>
                </div>
            </div>
        </form>
    )
}