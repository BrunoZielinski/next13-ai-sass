import { Avatar, AvatarImage } from './ui/avatar'

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage
        sizes="8"
        className="p-1"
        src="/logo.png"
        draggable={false}
      />
    </Avatar>
  )
}
