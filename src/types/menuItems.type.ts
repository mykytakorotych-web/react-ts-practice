import type { LucideIcon } from "lucide-react"

export interface IMenuItem {
  label: string
  icon: LucideIcon
}

export type TSideBarPages = "chats" | "profile" | "search"
