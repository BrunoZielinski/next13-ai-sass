import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/apiLimit'
import { checkSubscription } from '@/lib/subscription'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isPro = await checkSubscription()
  const apiLimitCount = await getApiLimitCount()

  return (
    <div className="relative h-full">
      <div className="hidden h-full bg-gray-900 md:w-72 md:flex md:flex-col md:fixed md:inset-y-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>

      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  )
}
