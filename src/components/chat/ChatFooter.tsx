import { useState } from "react"
import { ChatInput } from "./ChatInput"
import { LeftActionButtons } from "./LeftActionButtons"
import { SendOrRecordButton } from "./SendOrRecordButton"

interface ChatFooterProps {
  onSend: (message: string) => void
}

export function ChatFooter({ onSend }: ChatFooterProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return
    onSend(message)
    setMessage("")
  }

  return (
    <footer className="shrink-0 bg-chat-background px-4">
      <div className="w-full bg-chat-background flex items-end px-4 border-t border-secondary-foreground/60 text-secondary-foreground py-2">
        <LeftActionButtons />

        <ChatInput
          message={message}
          setMessage={setMessage}
          handleMessageSend={handleSend}
        />

        <SendOrRecordButton message={message} handleMessageSend={handleSend} />
      </div>
    </footer>
  )
}
