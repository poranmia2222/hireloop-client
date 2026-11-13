"use server"

import { headers } from "next/headers"

import { auth, db } from "@/lib/auth"

export type JobFormState = {
  status: "idle" | "success" | "error"
  message: string
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]
const categories = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Other",
]
const salaryFrequencies = [
  "per year",
  "per month",
  "per week",
  "per day",
  "per hour",
]

function getText(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === "string" ? value.trim() : ""
}

export async function createJob(
  _previousState: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    return { status: "error", message: "Please sign in to publish a job." }
  }
  if (session.user.role?.toLowerCase() !== "recruiter") {
    return {
      status: "error",
      message: "Only recruiter accounts can publish jobs.",
    }
  }

  const jobTitle = getText(formData, "jobTitle")
  const companyName = getText(formData, "companyName")
  const category = getText(formData, "category")
  const jobType = getText(formData, "jobType")
  const location = getText(formData, "location")
  const deadline = getText(formData, "deadline")
  const minSalaryValue = getText(formData, "minSalary")
  const maxSalaryValue = getText(formData, "maxSalary")
  const salaryFrequency = getText(formData, "salaryFrequency")
  const responsibilities = getText(formData, "responsibilities")
  const qualifications = getText(formData, "qualifications")

  if (
    !jobTitle ||
    !companyName ||
    !location ||
    !responsibilities ||
    !qualifications
  ) {
    return {
      status: "error",
      message: "Complete all required fields before publishing.",
    }
  }

  if (
    !categories.includes(category) ||
    !jobTypes.includes(jobType) ||
    !salaryFrequencies.includes(salaryFrequency)
  ) {
    return { status: "error", message: "Choose valid job details and try again." }
  }

  const minSalary = minSalaryValue ? Number(minSalaryValue) : null
  const maxSalary = maxSalaryValue ? Number(maxSalaryValue) : null
  if (
    (minSalary !== null && (!Number.isFinite(minSalary) || minSalary < 0)) ||
    (maxSalary !== null && (!Number.isFinite(maxSalary) || maxSalary < 0)) ||
    (minSalary !== null && maxSalary !== null && maxSalary < minSalary)
  ) {
    return {
      status: "error",
      message: "Enter valid salary amounts, with the maximum at least the minimum.",
    }
  }

  if (deadline && Number.isNaN(Date.parse(deadline))) {
    return { status: "error", message: "Enter a valid application deadline." }
  }

  try {
    await db.collection("jobs").insertOne({
      jobTitle,
      companyName,
      category,
      jobType,
      remote: formData.get("remote") === "true",
      location,
      deadline: deadline || null,
      minSalary,
      maxSalary,
      salaryFrequency,
      responsibilities,
      qualifications,
      recruiterId: session.user.id,
      status: "published",
      createdAt: new Date(),
    })
  } catch (error) {
    console.error("Failed to publish recruiter job", error)
    return {
      status: "error",
      message: "We couldn't publish the job. Please try again.",
    }
  }

  return { status: "success", message: "Your job has been published." }
}
