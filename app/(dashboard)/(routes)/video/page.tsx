'use client'

import z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { VideoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { formSchema } from './constants'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { Input } from '@/components/ui/input'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { useProModal } from '@/hooks/useProModal'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

export default function VideoPage() {
  const router = useRouter()
  const { onOpen } = useProModal()
  const [video, setVideo] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined)

      const response = await axios.post('/api/video', values)

      setVideo(response.data[0])
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
        icon={VideoIcon}
        title="Video Generation"
        bgColor="bg-orange-700/10"
        iconColor="text-orange-700"
        description="Turn your prompt into video."
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
                        placeholder="Clown fish swimming around a coral reef"
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

          {!video && !isLoading && <Empty label="No video generated." />}

          {video && (
            <video
              controls
              className="w-full mt-8 bg-black border rounded-lg aspect-video"
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  )
}
