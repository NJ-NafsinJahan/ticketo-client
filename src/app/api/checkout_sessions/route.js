import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { getUser } from "@/lib/api/session";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await getUser(); // import getUser for session & user data

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1TlOXlK775VgufbMA0I0JuVw",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/dashboard/organizer/premium-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    // console.log(session);

    // return NextResponse.redirect(session.url, 303);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    // console.log(err, "err from checkout_session");
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
