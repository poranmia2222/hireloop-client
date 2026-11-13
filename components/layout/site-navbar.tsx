"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import logo from "@/app/images/logo.png"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"



export function SiteNavbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const {data: session} = useSession()
  const router = useRouter()

  const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href:  `/dashboard/${session?.user.role}` },
]

  const handleSignOut = async() =>{
    await signOut()
    router.push('/sign-in')

  }


  return (
    <header className={cn("px-4 pt-4 sm:px-6 sm:pt-6", className)}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl bg-[#1B1B1B] px-6 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Hireloop homepage"
        >
          <Image src={logo} alt="Hireloop" preload className="h-8 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-foreground/90 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <span aria-hidden="true" className="h-5 w-px bg-white/15" />

          <div className="flex items-center gap-6">
            {
              session?.user ?
              <>
              <span>Welcome! {session?.user.name}</span>
              <Button
              onClick={handleSignOut}
              variant="destructive"
              >Sign Out</Button>
              </>: <>
              
              <Link
              href="/sign-in"
              className="text-sm font-medium text-[#7A64F2] transition-colors hover:text-[#9481F5]"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-10 rounded-lg bg-[#6C55EC] px-6 text-white hover:bg-[#7A64F2]"
              )}
            >
              Get Started
            </Link></>
            }
          </div>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-foreground md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-7xl rounded-xl bg-[#1B1B1B] px-6 py-4 md:hidden">
          <div className="flex flex-col divide-y divide-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-foreground/90 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-[#7A64F2]"
            >
              Sign In
            </Link>
            <div className="pt-3">
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants(),
                  "h-10 w-full rounded-lg bg-[#6C55EC] text-white hover:bg-[#7A64F2]"
                )}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
