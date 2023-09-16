'use client'

import z from 'zod'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Download, ImageIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { Input } from '@/components/ui/input'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { useProModal } from '@/hooks/useProModal'
import { Card, CardFooter } from '@/components/ui/card'
import { amountOptions, formSchema, resolutionOptions } from './constants'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'

export default function ImagePage() {
  const router = useRouter()
  const { onOpen } = useProModal()
  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])

      const response = await axios.post('/api/image', values)

      const urls = response.data.map((image: { url: string }) => image.url)

      setImages(urls)
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
        icon={ImageIcon}
        title="Image Generation"
        bgColor="bg-pink-700/10"
        iconColor="text-pink-700"
        description="Turn your prompt into an image."
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="p-0 m-0">
                      <Input
                        disabled={isLoading}
                        placeholder="A picture of a horse in Swiss Alps"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <FormControl className="p-0 m-0">
                      <Select
                        value={field.value}
                        disabled={isLoading}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {amountOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <FormControl className="p-0 m-0">
                      <Select
                        value={field.value}
                        disabled={isLoading}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {resolutionOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
            <div className="p-20">
              <Loader />
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}

          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map(image => (
              <Card key={image} className="overflow-hidden rounded-lg">
                <div className="relative aspect-square">
                  <Image fill src={image} alt="Image" />
                </div>

                <CardFooter className="p-2">
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => window.open(image, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
