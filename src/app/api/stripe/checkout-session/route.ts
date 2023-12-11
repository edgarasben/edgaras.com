import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2023-10-16'
})

// ="https://buy.stripe.com/6oE6qQfmCaTqg927st"
export async function POST(request: Request) {
  const body = await request.json()
  console.log(body) // the POST body as JSON object

  // Create Checkout Sessions from body params.
  const params: Stripe.Checkout.SessionCreateParams = {
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: body.priceId,
        quantity: body.quantity
      }
    ],
    mode: 'payment',
    success_url: body.successUrl,
    cancel_url: body.cancelUrl
  }

  try {
    // Create Checkout Sessions from body params.
    const checkoutSession = await stripe.checkout.sessions.create(params)
    return NextResponse.json(checkoutSession)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ statusCode: 500, message: errorMessage })
  }
}
