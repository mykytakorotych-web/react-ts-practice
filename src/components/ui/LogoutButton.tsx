import { DoorOpen } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { SettingsRow } from "./SettingsRow"

export function LogoutButton() {
  const { logout } = useAuth()

  return <SettingsRow Icon={DoorOpen} title="Log Out" onClick={logout} />
}
