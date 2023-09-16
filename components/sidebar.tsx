'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import {
  Code,
  Music,
  Settings,
  ImageIcon,
  VideoIcon,
  MessageSquare,
  LayoutDashboard,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { FreeCount } from './freeCount'
import { checkSubscription } from '@/lib/subscription'

const montserrat = Montserrat({
  weight: '600',
  subsets: ['latin'],
})

const routes = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-sky-500',
  },
  {
    icon: MessageSquare,
    href: '/conversation',
    label: 'Conversation',
    color: 'text-violet-500',
  },
  {
    href: '/image',
    icon: ImageIcon,
    color: 'text-pink-700',
    label: 'Image Generation',
  },
  {
    href: '/video',
    icon: VideoIcon,
    color: 'text-orange-700',
    label: 'Video Generation',
  },
  {
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    label: 'Music Generation',
  },
  {
    icon: Code,
    href: '/code',
    color: 'text-green-700',
    label: 'Code Generation',
  },
  {
    icon: Settings,
    href: '/settings',
    label: 'Settings',
  },
]

interface SidebarProps {
  isPro: boolean
  apiLimitCount: number
}

export const Sidebar = ({ isPro = false, apiLimitCount = 0 }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full py-4 space-y-4 bg-[#111827] text-white">
      <div className="flex-1 px-3 py-2">
        <Link
          as={'/dashboard'}
          href="/dashboard"
          className="flex items-center pl-3 mb-14"
        >
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              priority
              sizes="8"
              alt="Logo"
              src="/logo.png"
              draggable={false}
            />
          </div>

          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            Genius
          </h1>
        </Link>

        <div className="space-y-1">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              as={`${route.href}`}
              className={cn(
                'flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10',
                pathname === route.href ? 'bg-white/10' : 'text-zinc-400',
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <FreeCount isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  )
}
