import React from "react";
import Link from "next/link";
import {
    BadgeCheck,
    Check,
    ChevronRight,
    CreditCard,
    ShieldCheck,
} from "lucide-react";
import { PayButton } from "./pay-button";

const planFeatures = [
    "Unlimited job applications",
    "Priority profile in recruiter searches",
    "Advanced application analytics",
    "Real-time interview tracking",
    "Resume review by experts",
    "Priority customer support",
];

const price = { amount: "€19.00", period: "per month", cycle: "Billed monthly, cancel anytime" };

const BillingPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-2 flex items-center gap-1.5 text-sm">
                <Link
                    href="/dashboard/candidate"
                    className="text-[#777982] transition-colors hover:text-[#D4D4D8]"
                >
                    Billing
                </Link>
                <ChevronRight className="size-3.5 text-[#55565E]" />
                <span className="text-[#8F88FF]">Upgrade Plan</span>
            </nav>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5] sm:text-3xl">
                    Upgrade to Hireloop Pro
                </h1>
                <p className="mt-1.5 text-sm text-[#777982]">
                    Unlock every feature and boost your chances of getting hired.
                </p>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[1fr_400px]">
                {/* Plan */}
                <section className="rounded-xl border border-white/[0.06] bg-[#131315] p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex size-10 items-center justify-center rounded-lg bg-[#6C55EC]/15">
                                    <CreditCard className="size-5 text-[#8F88FF]" />
                                </span>
                                <div>
                                    <h2 className="text-lg font-semibold text-[#F4F4F5]">
                                        Hireloop Pro Plan
                                    </h2>
                                    <p className="text-xs text-[#777982]">For job seekers</p>
                                </div>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5C53FE]/15 px-2.5 py-1 text-xs font-medium text-[#8F88FF]">
                            <BadgeCheck className="size-3.5" />
                            Recommended
                        </span>
                    </div>

                    <div className="mt-6 flex items-baseline gap-2">
                        <span className="text-4xl font-semibold tracking-tight text-[#F4F4F5]">
                            {price.amount}
                        </span>
                        <span className="text-sm text-[#777982]">{price.period}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#777982]">{price.cycle}</p>

                    <ul className="mt-6 grid gap-3 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
                        {planFeatures.map((feature) => (
                            <li key={feature} className="flex items-center gap-2.5 text-sm text-[#D4D4D8]">
                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                                    <Check className="size-3 text-emerald-400" />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Order summary */}
                <section className="rounded-xl border border-white/[0.06] bg-[#131315] p-6">
                    <h2 className="text-lg font-semibold text-[#F4F4F5]">Order Summary</h2>

                    <div className="mt-5 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#A1A4AA]">Hireloop Pro — Monthly</span>
                            <span className="font-medium text-[#D4D4D8]">{price.amount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#A1A4AA]">Tax</span>
                            <span className="text-[#A1A4AA]">Calculated at checkout</span>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">
                        <span className="text-sm font-medium text-[#F4F4F5]">Total due today</span>
                        <span className="text-lg font-semibold text-[#F4F4F5]">{price.amount}</span>
                    </div>

                    <div className="mt-6">
                        <PayButton />
                        <p className="mt-3 flex items-start gap-2 text-xs text-[#777982]">
                            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                            Payments are secure and encrypted. You&apos;ll be redirected to Stripe
                            to complete your purchase.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BillingPage;
