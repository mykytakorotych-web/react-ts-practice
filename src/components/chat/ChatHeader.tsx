import { ChevronLeft } from "lucide-react"
import type { User } from "../../types/user.types"
import { Skeleton } from "../ui/Skeleton"

import { ChatName } from "./ChatName"
import { ChatSavedMessages } from "./ChatSavedMessages"

interface ChatHeaderProps {
  isUserLoading: boolean
  isCurrentUser: boolean
  userProfile: User | undefined
  closeChat: () => void
}

export function ChatHeader({
  isUserLoading,
  isCurrentUser,
  userProfile,
  closeChat,
}: ChatHeaderProps) {
  return (
    <header className="shrink-0 bg-window-background p-4 h-18 flex items-center gap-4 border-b border-gray-100">
      <button
        className="block sm:hidden text-primary hover:bg-chat-background rounded-full duration-300 p-2"
        onClick={closeChat}
      >
        <ChevronLeft />
      </button>

      {isUserLoading ? (
        <Skeleton width="197px" height="46.5px" />
      ) : !isCurrentUser ? (
        <ChatName userProfile={userProfile} />
      ) : (
        <ChatSavedMessages userProfile={userProfile} />
      )}
    </header>
  )
}
