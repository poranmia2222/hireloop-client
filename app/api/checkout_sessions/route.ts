import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { getSession } from '@/lib/core/server';


export async function POST() {
    const userSession = await getSession()
  try {
    const headersList = await headers()
    const origin = headersList.get('origin') ?? `http://${headersList.get('host') ?? 'localhost:3000'}`

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1UcWNp2FWI73corYWbkJ2rrY',
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: userSession?.user.email,
      metadata: {
        userId: userSession?.user.id ?? null,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
      integration_identifier: 'hire_loop_web_001',
    });
    if (!session.url) {
      throw new Error('Stripe checkout session did not return a redirect URL')
    }
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    const error = err instanceof Error ? err: new Error(String(err))
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}