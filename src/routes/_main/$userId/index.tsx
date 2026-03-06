import { createFileRoute } from "@tanstack/react-router"
import { Mic, Paperclip, Smile } from "lucide-react"
import { ChatHeader } from "../../../components/chat/ChatHeader"
import { ChatMessages } from "../../../components/chat/ChatMessages"
import { ButtonWithIcon } from "../../../components/ui/ButtonWithIcon"
import { Loader } from "../../../components/ui/Loader"
import { useUserChat } from "../../../hooks/useUserChat"

export const Route = createFileRoute("/_main/$userId/")({
  component: ChatComponent,
})

function ChatComponent() {
  const { userId } = Route.useParams()
  const {
    postsData,
    userProfile,
    isCurrentUser,
    isLoading,
    isUserLoading,
    messagesEndRef,
    closeChat,
  } = useUserChat(userId)

  return (
    <div className="flex flex-col h-full w-full relative bg-chat-background">
      <ChatHeader
        isUserLoading={isUserLoading}
        isCurrentUser={!!isCurrentUser}
        userProfile={userProfile}
        closeChat={closeChat}
      />

      <div className="flex-1 p-4 overflow-y-auto flex flex-col">
        <div className="mt-auto flex flex-col gap-2">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <ChatMessages
                postsData={postsData}
                isCurrentUser={!!isCurrentUser}
              />
              <ChatMessages
                postsData={postsData}
                isCurrentUser={!!isCurrentUser}
              />
              <ChatMessages
                postsData={postsData}
                isCurrentUser={!!isCurrentUser}
              />
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <footer className="shrink-0 bg-chat-background px-4">
        <div className="w-full bg-chat-background flex items-center px-4 border-t border-secondary-foreground/60 text-secondary-foreground">
          <div className="flex">
            <ButtonWithIcon Icon={Paperclip} additionalStyles="-rotate-43" />
            <ButtonWithIcon Icon={Smile} />
          </div>
          <input
            className="w-full p-4 outline-0 text-foreground"
            id="messageInput"
            name="messageInput"
            type="text"
            placeholder="Message"
          />
          <ButtonWithIcon Icon={Mic} />
        </div>
      </footer>
    </div>
  )
}
