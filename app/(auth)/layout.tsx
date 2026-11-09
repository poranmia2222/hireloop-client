import Image from "next/image"
import Link from "next/link"

import logo from "@/app/images/logo.png"

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="dark flex min-h-screen flex-col bg-[#0A0A0A] text-foreground [background-image:radial-gradient(120%_90%_at_50%_0%,#2A2A2A_0%,#131313_45%,#0A0A0A_100%)]">
            <header className="px-4 pt-8 sm:px-6">
                <Link
                    href="/"
                    className="mx-auto flex w-fit items-center"
                    aria-label="Hireloop homepage"
                >
                    <Image src={logo} alt="Hireloop" preload className="h-9 w-auto" />
                </Link>
            </header>
            <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
                <div className="w-full max-w-md">{children}</div>
            </main>
            <footer className="pb-6 text-center text-xs text-muted-foreground">
                © 2026 HireLoop. All rights reserved.
            </footer>
        </div>
    )
}
