'use client'

import z from 'zod'
import axios from 'axios'
import OpenAI from 'openai'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MessageSquare } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'
import { formSchema } from './constants'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { Input } from '@/components/ui/input'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { useProModal } from '@/hooks/useProModal'
import { BotAvatar } from '@/components/botAvatar'
import { UserAvatar } from '@/components/userAvatar'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

export default function ConversationPage() {
  const router = useRouter()
  const { onOpen } = useProModal()
  const [messages, setMessages] = useState<
    OpenAI.Chat.ChatCompletionMessageParam[]
  >([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage]

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      })

      setMessages(current => [...current, userMessage, response.data])

      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        onOpen()
      } else {
        toast.error('Something went wrong')
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title="Conversation"
        icon={MessageSquare}
        bgColor="bg-violet-500/10"
        iconColor="text-violet-500"
        description="Our most advanced conversation model."
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                className="w-full col-span-12 lg:col-span-2"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}

          <div className="flex flex-col-reverse gap-y-4">
            {messages.map(message => (
              <div
                key={message.content}
                className={cn(
                  'p-8 w-full flex items-start gap-x-8 rounded-lg',
                  message.role === 'user'
                    ? 'bg-white border border-black/10'
                    : 'bg-muted',
                )}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm ">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
