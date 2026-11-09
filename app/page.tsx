import { SiteNavbar } from "@/components/layout/site-navbar"
import { HeroSection } from "@/components/layout/hero-section"

export default function Page() {
  return (
    <div className="dark min-h-screen bg-[#0A0A0A] text-foreground [background-image:radial-gradient(120%_90%_at_50%_0%,#2A2A2A_0%,#131313_45%,#0A0A0A_100%)]">
      <SiteNavbar />
      <HeroSection />
    </div>
  )
}
