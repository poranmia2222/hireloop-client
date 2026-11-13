import { Suspense } from "react"

import DashboardSidebar from "../components/DashboardSidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider className="dark min-h-screen bg-[#0B0B0C] text-foreground">
            {/* Suspense: the sidebar reads searchParams/pathname on the client */}
            <Suspense>
                <DashboardSidebar />
            </Suspense>
            <SidebarInset className="bg-[#0B0B0C]">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/[0.06] px-6">
                    <SidebarTrigger className="text-[#A1A4AA] hover:bg-[#1B1B1E] hover:text-white" />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout
