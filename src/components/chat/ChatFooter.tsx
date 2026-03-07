import { Mic, Paperclip, SendHorizontal, Smile } from "lucide-react"
import { ButtonWithIcon } from "../ui/ButtonWithIcon"

interface ChatFooterProps {
  message: string
  setMessage: (value: string) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  handleMessageSend: () => void
}

export function ChatFooter({
  message,
  handleKeyDown,
  handleMessageSend,
  setMessage,
}: ChatFooterProps) {
  return (
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
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => handleKeyDown(e)}
        />
        {message ? (
          <ButtonWithIcon
            Icon={SendHorizontal}
            onClick={() => handleMessageSend()}
            additionalStyles="bg-primary text-background hover:bg-primary/60!"
          />
        ) : (
          <ButtonWithIcon Icon={Mic} />
        )}
      </div>
    </footer>
  )
}
