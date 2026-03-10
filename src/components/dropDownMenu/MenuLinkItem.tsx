import { Link } from "@tanstack/react-router"
import { Bookmark } from "lucide-react"

interface MenuLinkItemProps {
  userId: number
  onClick: () => void
}

export function MenuLinkItem({ userId, onClick }: MenuLinkItemProps) {
  return (
    <Link
      to={"/$userId"}
      params={{ userId: `${userId}` }}
      className="w-full flex items-center px-4 py-2.5 hover:bg-gray-100 transition-colors text-left"
      onClick={onClick}
    >
      <Bookmark className="w-5 h-5 text-gray-500 mr-4 stroke-[1.5]" />
      <span className="flex-1 text-[15px] font-medium text-foreground">
        Saved Messages
      </span>
    </Link>
  )
}
