import { Mic, Paperclip, SendHorizontal, Smile } from "lucide-react"
import { useEffect, useRef } from "react"
import { ButtonWithIcon } from "../ui/ButtonWithIcon"

interface ChatFooterProps {
  message: string
  setMessage: (value: string) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
  handleMessageSend: () => void
}

export function ChatFooter({
  message,
  handleKeyDown,
  handleMessageSend,
  setMessage,
}: ChatFooterProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  return (
    <footer className="shrink-0 bg-chat-background px-4">
      <div className="w-full bg-chat-background flex items-end px-4 border-t border-secondary-foreground/60 text-secondary-foreground py-2">
        <div className="flex">
          <ButtonWithIcon
            id="chat-attach-btn"
            aria-label="Attach media or file"
            title="Attach file"
            Icon={Paperclip}
            additionalStyles="-rotate-43"
          />
          <ButtonWithIcon
            id="chat-emoji-btn"
            aria-label="Open emoji picker"
            title="Choose emoji"
            Icon={Smile}
          />
        </div>
        <textarea
          ref={textareaRef}
          id="chat-message-input"
          aria-label="Type a message"
          rows={1}
          className="w-full resize-none max-h-32 overflow-y-auto text-foreground p-2 outline-0"
          value={message}
          placeholder="Message"
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {message ? (
          <ButtonWithIcon
            id="chat-send-btn"
            aria-label="Send message"
            title="Send message"
            Icon={SendHorizontal}
            onClick={() => handleMessageSend()}
            additionalStyles="bg-primary text-background hover:bg-primary/60!"
          />
        ) : (
          <ButtonWithIcon
            id="chat-record-btn"
            aria-label="Record voice message"
            title="Record voice message"
            Icon={Mic}
          />
        )}
      </div>
    </footer>
  )
}
