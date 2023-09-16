import Image from 'next/image'

export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-y-4">
      <div className="relative w-10 h-10 animate-spin">
        <Image
          fill
          priority
          alt="Logo"
          sizes="10"
          src="/logo.png"
          draggable={false}
        />
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Genius is thinking...
      </p>
    </div>
  )
}
