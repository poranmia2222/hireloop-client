"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "@/lib/auth-client"

export function SignInForm() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())

        const { error } = await signIn.email({
            email:data.email as string,
            password: data.password as string,
        })

        if (error) {
            setError(error.message ?? "Something went wrong. Please try again.")
            setLoading(false)
            return
        }

        router.push("/")
    }

    return (
        <div className="rounded-xl border border-white/10 bg-[#131313] p-8 shadow-2xl">
            <div className="text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Welcome back
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                    Sign in to continue your job search — faster.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
                        placeholder="••••••••"
                        autoComplete="current-password"
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
                    {loading ? "Signing in…" : "Sign In"}
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/sign-up"
                    className="font-medium text-[#7A64F2] hover:text-[#9481F5]"
                >
                    Sign up
                </Link>
            </p>
        </div>
    )
}
