import type { LucideIcon } from "lucide-react"

interface InfoRowProps {
  Icon: LucideIcon
  title: string
  subtitle: string
}

export function InfoRow({ Icon, title, subtitle }: InfoRowProps) {
  return (
    <div className="flex items-center gap-6 cursor-pointer hover:bg-secondary-foreground/5 p-3 rounded-xl transition-colors mx-2">
      <Icon className="w-6 h-6 text-secondary-foreground shrink-0" />
      <div className="flex flex-col min-w-0">
        <span className="text-foreground text-base truncate">{title}</span>
        <span className="text-sm text-secondary-foreground truncate">
          {subtitle}
        </span>
      </div>
    </div>
  )
}
