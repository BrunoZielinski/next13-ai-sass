import { Settings } from 'lucide-react'

import { Heading } from '@/components/heading'
import { checkSubscription } from '@/lib/subscription'
import { SubscriptionButton } from '@/components/subscriptionButton'

export default async function SettingsPage() {
  const isPro = await checkSubscription()

  return (
    <div>
      <Heading
        icon={Settings}
        title="Settings"
        bgColor="bg-gray-700/10"
        iconColor="text-gray-700"
        description="Manage account settings"
      />

      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? 'You are currently on a pro plan.'
            : 'You are currently on a free plan.'}
        </div>

        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  )
}
