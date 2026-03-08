import type { LucideIcon } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

interface SettingsRowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: LucideIcon
  title: string
}

export function SettingsRow({ Icon, title, ...props }: SettingsRowProps) {
  return (
    <button
      className="flex items-center gap-6 cursor-pointer hover:bg-secondary-foreground/5 px-7 py-3.5 transition-colors"
      {...props}
    >
      <Icon className="w-6 h-6 text-secondary-foreground shrink-0" />
      <span className="text-foreground text-base">{title}</span>
    </button>
  )
}
