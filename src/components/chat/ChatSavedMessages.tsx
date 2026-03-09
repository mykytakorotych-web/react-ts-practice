import { Bookmark } from "lucide-react"
import type { IUser } from "../../types/user.types"

export function ChatSavedMessages({
  userProfile,
}: {
  userProfile: IUser | undefined
}) {
  return (
    <div className="group flex items-center gap-3  rounded-xl hover:bg-chat-background transition-colors [&.active]:bg-primary cursor-pointer">
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-background shrink-0">
        <Bookmark fill="var(--background)" />
      </div>
      <div>
        <span className="font-medium leading-tight">Saved Messages</span>
        <p className="text-xs text-gray-500">@{userProfile?.username}</p>
      </div>
    </div>
  )
}
