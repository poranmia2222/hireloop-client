"use client"

import { useState } from "react"
import { Loader2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { startCheckoutSession } from "./actions"

export type CheckoutResult = {
    /** Stripe Checkout hosted page URL — null while Stripe is not integrated. */
    url: string | null
}

export function PayButton({ label = "Pay €19.00" }: { label?: string }) {
    const [pending, setPending] = useState(false)

    async function handlePay() {
        setPending(true)
        try {
            const result = await startCheckoutSession()
            if (result.url) {
                // Stripe Checkout ready — send the user to the hosted payment page
                window.location.href = result.url
            } else {
                // TODO: remove once startCheckoutSession redirects to Stripe
                toast.add({
                    title: "Stripe checkout coming soon",
                    description: "Online payments are not wired up yet.",
                    type: "info",
                })
            }
        } finally {
            setPending(false)
        }
    }

    return (
        <Button
            type="button"
            onClick={handlePay}
            disabled={pending}
            className="h-11 w-full rounded-lg bg-[#6C55EC] text-white hover:bg-[#5C45D6]"
        >
            {pending ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" data-icon="inline-start" />}
            {pending ? "Redirecting…" : label}
        </Button>
    )
}
