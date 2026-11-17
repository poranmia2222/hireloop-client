
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { checkoutVerify } from "@/lib/action/payments";

type Props = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function Success({ searchParams }: Props) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/payment");
  }

  let session;

  try {
    session = await stripe.checkout.sessions.retrieve(
      session_id,
      {
        expand: ["line_items", "payment_intent"],
      }
    );
  } catch (error) {
    console.error("Stripe session retrieval failed:", error);
    redirect("/payment?canceled=1");
  }

  if (session.status !== "complete") {
    redirect("/payment");
  }

  if (session.payment_status !== "paid") {
    return (
      <section>
        <h1>Payment is not completed</h1>
        <p>
          Your payment status is: {session.payment_status}
        </p>
      </section>
    );
  }

  try {
    const result = await checkoutVerify(session_id);

    console.log("Verification result:", {result});
  } catch (error) {
    console.error("Payment verification failed:", error);

    return (
      <section>
        <h1>Payment received</h1>
        <p>
          Your payment is being processed. Please check
          your dashboard shortly.
        </p>
      </section>
    );
  }

  return (
    <section id="success">
      <h1>Payment Successful!</h1>

      <p>
        We appreciate your business! A confirmation email
        will be sent to {session.customer_email}.
      </p>

      <a href="mailto:orders@example.com">
        Contact support
      </a>
    </section>
  );
}
