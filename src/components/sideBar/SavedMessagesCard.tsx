import { Link } from "@tanstack/react-router"
import { Bookmark } from "lucide-react"
import { useIsChatOpenStore } from "../../store/useIsChatOpenStore"

export function SavedMessagesCard({ userId }: { userId: number | undefined }) {
  const { openChat } = useIsChatOpenStore()
  return (
    <Link
      to="/$userId"
      params={{ userId: `${userId}` }}
      className="group flex items-center gap-3 p-2 rounded-xl hover:bg-chat-background transition-colors [&.active]:bg-primary cursor-pointer"
      onClick={openChat}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary text-background shrink-0">
        <Bookmark fill="var(--background)" />
      </div>
      <div>
        <h3 className="font-medium group-[.active]:text-background">
          Saved Messages
        </h3>
        <p className="group-[.active]:text-background text-secondary-foreground line-clamp-1 group">
          Chat with yourself
        </p>
      </div>
    </Link>
  )
}
