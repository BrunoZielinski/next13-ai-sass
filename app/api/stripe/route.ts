import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs'

import { stripe } from '@/lib/stripe'
import { prismadb } from '@/lib/prismadb'
import { absoluteUrl } from '@/lib/utils'

const settingsUrl = absoluteUrl('/settings')

export async function GET() {
  try {
    const { userId } = auth()
    const user = await currentUser()

    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const userSubscription = await prismadb.userSubscription.findFirst({
      where: { userId },
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      cancel_url: settingsUrl,
      success_url: settingsUrl,
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'USD',
            unit_amount: 2000,
            recurring: {
              interval: 'month',
            },
            product_data: {
              name: 'Genius Pro',
              description: 'Unlimited AI Generations',
            },
          },
        },
      ],
      metadata: {
        userId,
      },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.error('[STRIPE_ERROR]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
