'use client'

import axios from 'axios'
import { useState } from 'react'
import { Zap } from 'lucide-react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'

interface SubscriptionButtonProps {
  isPro: boolean
}

export const SubscriptionButton = ({
  isPro = false,
}: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      toast.error('Something went wrong')
      // console.error('BILLING_ERROR', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant={isPro ? 'default' : 'premium'}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
}
