import { UserButton } from '@clerk/nextjs'

import { getApiLimitCount } from '@/lib/apiLimit'
import { checkSubscription } from '@/lib/subscription'
import { MobileSidebar } from '@/components/mobileSidebar'

export const Navbar = async () => {
  const isPro = await checkSubscription()
  const apiLimitCount = await getApiLimitCount()

  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />

      <div className="flex justify-end w-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
