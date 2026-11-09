import Image from "next/image"
import Link from "next/link"
import { MapPin, Search } from "lucide-react"

import globe from "@/app/images/globe.png"
import { Button } from "@/components/ui/button"

const trendingPositions = ["Product Designer", "AI Engineer", "Dev-ops Engineer"]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-72 sm:pt-24">
      {/* Globe backdrop */}
      <Image
        src={globe}
        alt=""
        aria-hidden
        preload
        className="pointer-events-none absolute top-full left-1/2 w-[min(69rem,240%)] max-w-none -translate-x-1/2 -translate-y-[46%]"
      />

      <div className="relative z-10 flex flex-col items-center px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="flex items-center justify-center gap-4">
          <span
            aria-hidden
            className="hidden h-px w-28 bg-gradient-to-r from-transparent to-white/20 md:block"
          />
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2 shadow-lg">
            <span aria-hidden>💼</span>
            <span className="text-sm font-bold text-[#FF7A3E]">50,000+</span>
            <span className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground">
              NEW JOBS THIS MONTH
            </span>
          </span>
          <span
            aria-hidden
            className="hidden h-px w-28 bg-gradient-to-l from-transparent to-white/20 md:block"
          />
        </div>

        {/* Headline */}
        <h1 className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          action="/jobs"
          className="mt-10 flex h-14 w-full max-w-2xl items-center rounded-xl border border-white/10 bg-gradient-to-b from-[#1D1D1D] to-[#131313] px-3 shadow-2xl"
        >
          <div className="flex h-9 min-w-0 flex-1 items-center gap-2 px-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              name="q"
              placeholder="Job title, skill or company"
              className="h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <span aria-hidden className="h-6 w-px shrink-0 bg-white/10" />
          <div className="flex h-9 min-w-0 flex-1 items-center gap-2 px-2">
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
            <input
              name="location"
              placeholder="Location or Remote"
              className="hidden h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:block"
            />
          </div>
          <Button
            size="icon"
            type="submit"
            aria-label="Search jobs"
            className="ml-2 size-9 shrink-0 rounded-full bg-[#6C55EC] text-white hover:bg-[#7A64F2]"
          >
            <Search className="size-4" />
          </Button>
        </form>

        {/* Trending positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="mr-1 text-muted-foreground">Trending Position:</span>
          {trendingPositions.map((position) => (
            <Link
              key={position}
              href={`/jobs?q=${encodeURIComponent(position)}`}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-foreground/90 transition-colors hover:border-white/20 hover:bg-white/10"
            >
              {position}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
