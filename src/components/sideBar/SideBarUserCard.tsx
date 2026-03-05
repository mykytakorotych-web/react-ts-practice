import { Link } from "@tanstack/react-router"
import { useIsChatOpen } from "../../store/useIsChatOpen"
import type { User } from "../../types/user.types"

export function SideBarUserCard({ user }: { user: User }) {
  const { openChat } = useIsChatOpen()

  return (
    <Link
      to="/$userId"
      params={{ userId: `${user.id}` }}
      className="flex items-center gap-3 p-2 rounded-xl hover:bg-chat-background transition-colors [&.active]:bg-primary cursor-pointer"
      onClick={openChat}
    >
      <img
        src={user.image}
        alt={user.username}
        className="w-12 h-12 rounded-full shrink-0"
      />
      <div className="[&.active]:text-red-600">
        <h3 className="font-medium">{`${user.firstName} ${user.lastName}`}</h3>
        <p className="text-secondary-foreground line-clamp-1">
          {user.username}
        </p>
      </div>
    </Link>
  )
}
