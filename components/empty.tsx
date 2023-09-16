import Image from 'next/image'

interface EmptyProps {
  label: string
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image
          fill
          priority
          sizes="72"
          alt="Empty"
          src="/empty.png"
          draggable={false}
        />
      </div>

      <p className="text-muted-foreground text-center text-sm">{label}</p>
    </div>
  )
}
