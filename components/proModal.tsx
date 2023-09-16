'use client'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  Zap,
  Code,
  Music,
  Check,
  ImageIcon,
  VideoIcon,
  MessageSquare,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useProModal } from '@/hooks/useProModal'
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'

const tools = [
  {
    icon: MessageSquare,
    label: 'Conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    icon: Music,
    label: 'Music Generation',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: ImageIcon,
    label: 'Image Generation',
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
  },
  {
    icon: VideoIcon,
    color: 'text-orange-700',
    label: 'Video Generation',
    bgColor: 'bg-orange-700/10',
  },
  {
    icon: Code,
    color: 'text-green-700',
    label: 'Code Generation',
    bgColor: 'bg-green-700/10',
  },
]

export const ProModal = () => {
  const { isOpen, onClose } = useProModal()
  const [isLoading, setIsLoading] = useState(false)

  const onSubscribe = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      toast.error('Something went wrong')
      // console.error(error, 'STRIPE_CLIENT_ERROR')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center pb-2 gap-y-4">
            <div className="flex items-center py-1 font-bold gap-x-2">
              Upgrade to Genius
              <Badge variant="premium" className="py-1 text-sm uppercase">
                pro
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription className="pt-2 space-y-2 font-medium text-center text-zinc-900">
            {tools.map(tool => (
              <Card
                key={tool.label}
                className="flex items-center justify-between p-3 border-black/5"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                    <tool.icon className={cn('w-6 h-6', tool.color)} />
                  </div>

                  <div className="text-sm font-semibold">{tool.label}</div>
                </div>

                <Check className="w-5 h-5 text-primary" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full"
            disabled={isLoading}
            onClick={onSubscribe}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
