import { useEffect, useRef } from "react"

interface ChatInputProps {
  message: string
  setMessage: (value: string) => void
  handleMessageSend: () => void
}

export function ChatInput({
  message,
  setMessage,
  handleMessageSend,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleMessageSend()
    }
  }

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [message])

  return (
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
  )
}
