import { MessageCircleMore, PhoneCall, Settings, UserRound } from "lucide-react"
import type { MenuItem } from "../types/menuItems.type"

export const menuItems: MenuItem[] = [
  { label: "Chats", icon: MessageCircleMore },
  { label: "Contacts", icon: UserRound },
  { label: "Calls", icon: PhoneCall },
  { label: "Settings", icon: Settings },
]
