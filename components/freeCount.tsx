'use client'

import { Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

import { MAX_FREE_COUNTS } from '@/constants'
import { Button } from '@/components/ui/button'
import { useProModal } from '@/hooks/useProModal'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'

interface FreeCountProps {
  isPro: boolean
  apiLimitCount: number
}

export const FreeCount = ({
  isPro = false,
  apiLimitCount = 0,
}: FreeCountProps) => {
  const { onOpen } = useProModal()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isPro) return null

  return (
    <div className="px-3">
      <Card className="border-0 bg-white/10">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-sm text-center text-white">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>

            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>

          <Button variant="premium" className="w-full" onClick={onOpen}>
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
