import { Mic, SendHorizontal } from "lucide-react"
import { ButtonWithIcon } from "../ui/ButtonWithIcon"

interface SendOrRecordButtonProps {
  message: string
  handleMessageSend: () => void
}

export function SendOrRecordButton({
  message,
  handleMessageSend,
}: SendOrRecordButtonProps) {
  if (message) {
    return (
      <ButtonWithIcon
        id="chat-send-btn"
        aria-label="Send message"
        title="Send message"
        Icon={SendHorizontal}
        onClick={handleMessageSend}
        additionalStyles="bg-primary text-background hover:bg-primary/60!"
      />
    )
  }

  return (
    <ButtonWithIcon
      id="chat-record-btn"
      aria-label="Record voice message"
      title="Record voice message"
      Icon={Mic}
    />
  )
}
