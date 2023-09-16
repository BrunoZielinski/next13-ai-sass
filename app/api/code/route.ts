import OpenAI from 'openai'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { checkSubscription } from '@/lib/subscription'
import { checkApiLimit, increaseApiLimit } from '@/lib/apiLimit'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const instructionMessage: OpenAI.Chat.ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
}

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    const body = await request.json()
    const { messages } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse('OpenAI API Key not found', { status: 500 })
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 })
    }

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse('Free trial limit reached', { status: 403 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    })

    if (!isPro) {
      await increaseApiLimit()
    }

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.error('[CODE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
