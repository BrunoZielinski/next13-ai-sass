'use client'

import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface MobileSidebarProps {
  isPro: boolean
  apiLimitCount: number
}

export const MobileSidebar = ({
  isPro = false,
  apiLimitCount = 0,
}: MobileSidebarProps) => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Sheet open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  )
}
