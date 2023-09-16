'use client'

import {
  Code,
  Music,
  ImageIcon,
  VideoIcon,
  ArrowRight,
  MessageSquare,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

const tools = [
  {
    icon: MessageSquare,
    label: 'Conversation',
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    icon: Music,
    href: '/music',
    label: 'Music Generation',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    href: '/image',
    icon: ImageIcon,
    label: 'Image Generation',
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
  },
  {
    href: '/video',
    icon: VideoIcon,
    color: 'text-orange-700',
    label: 'Video Generation',
    bgColor: 'bg-orange-700/10',
  },
  {
    icon: Code,
    href: '/code',
    color: 'text-green-700',
    label: 'Code Generation',
    bgColor: 'bg-green-700/10',
  },
]

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-center md:text-4xl">
          Explore the power of AI
        </h2>

        <p className="text-sm font-light text-center text-muted-foreground md:text-lg">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>

      <div className="px-4 space-y-4 md:px-20 lg:px-32">
        {tools.map(tool => (
          <Card
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="flex items-center justify-between p-4 cursor-pointer border-black/5 hover:shadow-md translate"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)} />
              </div>

              <div className="font-semibold">{tool.label}</div>
            </div>

            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}
