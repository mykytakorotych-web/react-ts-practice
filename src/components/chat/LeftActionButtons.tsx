import { Paperclip, Smile } from "lucide-react"
import { ButtonWithIcon } from "../ui/ButtonWithIcon"

export function LeftActionButtons() {
  return (
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
  )
}
