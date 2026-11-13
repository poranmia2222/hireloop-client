"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    Bookmark,
    Briefcase,
    Building2,
    CirclePlus,
    ClipboardList,
    CreditCard,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
    Wallet,
    type LucideIcon,
} from "lucide-react"

import avatarImage from "@/app/images/avatar.png"
import logoImage from "@/app/images/logo.png"
import proCtaImage from "@/app/images/pro-cta.png"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "@/lib/auth-client"

export type DashboardRole = "candidate" | "recruiter" | "admin"

type MenuItem = {
    label: string
    href: string
    icon: LucideIcon
}

const menuItemsByRole: Record<DashboardRole, MenuItem[]> = {
    candidate: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
        { label: "Saved Jobs", href: "/dashboard/saved", icon: Bookmark },
        { label: "Applications", href: "/dashboard/applications", icon: FileText },
        { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    recruiter: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "My Company", href: "/dashboard/company", icon: Building2 },
        { label: "Add jobs", href: "/dashboard/recruiter/jobs/new", icon: CirclePlus },
        { label: "Manage Jobs", href: "/dashboard/recruiter/jobs", icon: ClipboardList },
        { label: "Applications", href: "/dashboard/applications", icon: FileText },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    admin: [
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { label: "Users", href: "/dashboard/users", icon: Users },
        { label: "Companies", href: "/dashboard/companies", icon: Building2 },
        { label: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
        { label: "Payments", href: "/dashboard/payments", icon: Wallet },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
}

const roleMeta: Record<
    DashboardRole,
    { portal: string; label: string; badge: string | null; planName: string | null }
> = {
    candidate: {
        portal: "Seeker Portal",
        label: "Candidate",
        badge: "Pro Member",
        planName: "Hireloop Pro Plan",
    },
    recruiter: {
        portal: "Recruiter Portal",
        label: "Recruiter",
        badge: "Premium",
        planName: "Hireloop Pro Plan",
    },
    admin: {
        portal: "Admin Console",
        label: "System Admin",
        badge: null,
        planName: null,
    },
}

function normalizeRole(value: unknown): DashboardRole | null {
    const role = typeof value === "string" ? value.trim().toLowerCase() : ""
    if (role === "candidate" || role === "recruiter" || role === "admin") return role
    return null
}

/** Demo routes that force a role preview, e.g. /dashboard/candidate. */
const rolePreviewRoutes: [RegExp, DashboardRole][] = [
    [/^\/dashboard\/candidate(\/|$)/, "candidate"],
    [/^\/dashboard\/recruiter(\/|$)/, "recruiter"],
    [/^\/dashboard\/recuiter(\/|$)/, "recruiter"],
    [/^\/dashboard\/admin(\/|$)/, "admin"],
]

function DashboardSidebar({
    role: roleProp,
    className,
}: {
    /** Overrides the session role — useful for previews and demo pages. */
    role?: DashboardRole | string
    className?: string
}) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { data: session } = useSession()
 console.log(session?.user.role)
    const role =
        (roleProp ? normalizeRole(roleProp) : null) ??
        normalizeRole(searchParams.get("role")) ??
        rolePreviewRoutes.find(([pattern]) => pattern.test(pathname))?.[1] ??
        normalizeRole(session?.user?.role) ??
        "candidate"
    const meta = roleMeta[role]
    const items = menuItemsByRole[role]

    const name = session?.user?.name || "Jane Doe"
    const avatar = session?.user?.image || avatarImage

    const isActive = (href: string) =>
        href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

    async function handleSignOut() {
        await signOut()
        router.push("/sign-in")
    }

    return (
        <Sidebar className={className}>
            <SidebarHeader className="gap-4 border-b border-white/[0.06] px-4 pt-4 pb-5">
                {/* Brand */}
                <div className="flex flex-col gap-1 px-2">
                    <span className="text-[10px] font-medium tracking-[0.2em] text-[#7C7F87] uppercase">
                        {meta.portal}
                    </span>
                    <Image src={logoImage} alt="Hireloop" preload className="" />
                </div>

                {/* Identity */}
                <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-[#141416] p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={typeof avatar === "string" ? avatar : avatar.src}
                        alt={name}
                        className="size-10 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#F4F4F5]">{name}</p>
                        <p className="truncate text-xs text-[#A1A4AA]">{meta.label}</p>
                    </div>
                    {meta.badge && (
                        <span className="shrink-0 rounded-full bg-[#5C53FE]/15 px-2 py-1 text-[10px] font-medium text-[#8F88FF]">
                            {meta.badge}
                        </span>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-3">
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {items.map((item) => {
                                const active = isActive(item.href)
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            render={<Link href={item.href} />}
                                            isActive={active}
                                            tooltip={item.label}
                                            className={cn(
                                                "h-9 rounded-lg text-[#A1A4AA] hover:bg-[#1B1B1E] hover:text-[#F4F4F5] data-[active=true]:bg-[#5C53FE]/15 data-[active=true]:font-medium data-[active=true]:text-white"
                                            )}
                                        >
                                            <item.icon
                                                className={cn("size-4", active && "text-[#8F88FF]")}
                                            />
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="gap-3 border-t border-white/[0.06] px-4 py-4">
                {/* Pro upsell (not shown for admins) */}
                {meta.planName && (
                    <div className="relative overflow-hidden rounded-xl border border-white/[0.08]">
                        <Image
                            src={proCtaImage}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 size-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
                        <div className="relative p-3">
                            <p className="text-sm font-semibold text-white">{meta.planName}</p>
                            <p className="mt-0.5 text-xs text-white/60">Access to all features</p>
                            <Link
                                href="/dashboard/billing"
                                className={cn(
                                    buttonVariants({ size: "sm" }),
                                    "mt-3 h-7 w-full rounded-lg bg-[#5C53FE] text-white hover:bg-[#8F88FF] hover:text-white"
                                )}
                            >
                                Upgrade
                            </Link>
                        </div>
                    </div>
                )}

                {/* User + logout */}
                <div className="flex items-center gap-2.5 px-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={typeof avatar === "string" ? avatar : avatar.src}
                        alt={name}
                        className="size-8 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#F4F4F5]">{name}</p>
                        <p className="truncate text-xs text-[#7C7F87]">{meta.label}</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleSignOut}
                        aria-label="Log out"
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#A1A4AA] transition-colors hover:bg-[#1B1B1E] hover:text-white"
                    >
                        <LogOut className="size-4" />
                    </button>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default DashboardSidebar
