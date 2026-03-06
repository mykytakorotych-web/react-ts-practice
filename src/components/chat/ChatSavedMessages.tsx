import { Bookmark } from "lucide-react"
import type { User } from "../../types/user.types"

export function ChatSavedMessages({
  userProfile,
}: {
  userProfile: User | undefined
}) {
  return (
    <div className="group flex items-center gap-3 p-2 rounded-xl hover:bg-chat-background transition-colors [&.active]:bg-primary cursor-pointer">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary text-background shrink-0">
        <Bookmark fill="var(--background)" />
      </div>
      <div>
        <h1 className="font-medium leading-tight">Saved Messages</h1>
        <p className="text-xs text-gray-500">@{userProfile?.username}</p>
      </div>
    </div>
  )
}
