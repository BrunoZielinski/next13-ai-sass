import Replicate from 'replicate'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { checkSubscription } from '@/lib/subscription'
import { checkApiLimit, increaseApiLimit } from '@/lib/apiLimit'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
})

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    const body = await request.json()
    const { prompt } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return new NextResponse('Replicate API Key not found', { status: 500 })
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 })
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse('Free trial limit reached', { status: 403 })
    }

    const response = await replicate.run(
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt: prompt,
        },
      },
    )

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[VIDEO_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
