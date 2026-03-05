import { DoorOpenIcon } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"

export function LogoutButton() {
  const { logout } = useAuth()

  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 bg-chat-background"
    >
      <DoorOpenIcon />
      <span>Log Out</span>
    </button>
  )
}
