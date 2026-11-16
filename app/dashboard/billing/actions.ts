"use server"

import type { CheckoutResult } from "./pay-button"

/**
 * Creates a Stripe Checkout session and returns the hosted checkout URL.
 *
 * TODO: implement with Stripe, e.g.:
 * 1. stripe.checkout.sessions.create({ line_items, mode: "subscription", success_url, cancel_url })
 * 2. return { url: session.url }
 *
 * For now it returns no URL — the Pay button shows a "coming soon" toast.
 */
export async function startCheckoutSession(): Promise<CheckoutResult> {
    return { url: null }
}
