"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Briefcase, Shield, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/auth-client"

const roles = [
    { value: "candidate", label: "Candidate", icon: UserRound },
    { value: "recruiter", label: "Recruiter", icon: Briefcase },
    { value: "admin", label: "Admin", icon: Shield },
] as const

export function SignUpForm() {
    const router = useRouter()
    const [role, setRole] = useState<(typeof roles)[number]["value"]>("candidate")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    console.log(role)
    
    
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    setLoading(true)

    try {
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const { error: signUpError } = await signUp.email({
            name: data.name as string,
            role,
            email: data.email as string,
            password: data.password as string,
        })

        if (signUpError) {
            setError(signUpError.message ?? "Signup failed.")
            return
        }

        router.push("/")
    } catch (err) {
        setError(
            err instanceof Error
                ? err.message
                : "Something went wrong."
        )
    } finally {
        setLoading(false)
    }
}


    return (
        <div className="rounded-xl border border-white/10 bg-[#131313] p-8 shadow-2xl">
            <div className="text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Create your account
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                    Join HireLoop and land your next role — faster.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        autoComplete="name"
                        required
                        name="name"
                        className="h-10 rounded-lg border-white/10 bg-[#1B1B1B] text-foreground focus-visible:border-[#7A64F2] focus-visible:ring-[#6C55EC]/25"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label>Role</Label>
                    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Role">
                        {roles.map((option) => {
                            const Icon = option.icon
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={role === option.value}
                                    onClick={() => setRole(option.value)}
                                    className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${role === option.value
                                        ? "border-[#6C55EC] bg-[#6C55EC]/10 text-foreground"
                                        : "border-white/10 bg-[#1B1B1B] text-foreground hover:border-white/20"
                                        }`}
                                >
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                    {option.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        name="email"
                        className="h-10 rounded-lg border-white/10 bg-[#1B1B1B] text-foreground focus-visible:border-[#7A64F2] focus-visible:ring-[#6C55EC]/25"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        required
                        name="password"
                        className="h-10 rounded-lg border-white/10 bg-[#1B1B1B] text-foreground focus-visible:border-[#7A64F2] focus-visible:ring-[#6C55EC]/25"
                    />
                </div>

                {error && (
                    <p
                        role="alert"
                        className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    >
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 h-10 rounded-lg bg-[#6C55EC] text-white hover:bg-[#7A64F2]"
                >
                    {loading ? "Creating account…" : "Get Started"}
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/sign-in"
                    className="font-medium text-[#7A64F2] hover:text-[#9481F5]"
                >
                    Sign in
                </Link>
            </p>
        </div>
    )
}
