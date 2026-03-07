import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { ChatFooter } from "../../../components/chat/ChatFooter"
import { ChatHeader } from "../../../components/chat/ChatHeader"
import { ChatMessages } from "../../../components/chat/ChatMessages"
import { Loader } from "../../../components/ui/Loader"
import { Sticker } from "../../../components/ui/Sticker"
import { useUserChat } from "../../../hooks/useUserChat"

export const Route = createFileRoute("/_main/$userId/")({
  component: ChatComponent,
})

function ChatComponent() {
  const { userId } = Route.useParams()
  const {
    postsData,
    userProfile,
    currentUser,
    isCurrentUser,
    isLoading,
    isUserLoading,
    messagesEndRef,
    closeChat,
    handleSend,
    openChat,
  } = useUserChat(userId)

  const [message, setMessage] = useState("")

  useEffect(() => {
    openChat()
  }, [openChat])

  const handleMessageSend = () => {
    if (!message.trim()) return
    handleSend(message.trim())
    setMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleMessageSend()
    }
  }

  return (
    <div className="flex flex-col h-full w-full relative bg-chat-background">
      <ChatHeader
        isUserLoading={isUserLoading}
        isCurrentUser={!!isCurrentUser}
        userProfile={userProfile}
        closeChat={closeChat}
      />

      <div className="flex-1 p-4 overflow-y-auto flex flex-col">
        {isLoading ? (
          <Loader />
        ) : postsData?.total === 0 ? (
          <div className="flex h-full w-full flex-col justify-center gap-4 items-center">
            <div className="p-4 rounded-2xl bg-window-background text-center">
              <h4>No messages here yet...</h4>
              <p className="mb-2">Send a message.</p>
              <Sticker name="hi" />
            </div>
          </div>
        ) : (
          <div className="mt-auto flex flex-col gap-2">
            <ChatMessages
              postsData={postsData}
              currentUserId={currentUser?.id}
            />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatFooter
        message={message}
        handleKeyDown={handleKeyDown}
        handleMessageSend={handleMessageSend}
        setMessage={setMessage}
      />
    </div>
  )
}
