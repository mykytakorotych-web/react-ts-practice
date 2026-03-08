import type { LucideIcon } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

interface SearchQueryState extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: LucideIcon
  setSearchQuery: () => void
}

export function TopSectionButton({
  Icon,
  setSearchQuery,
  ...props
}: SearchQueryState) {
  return (
    <button
      onClick={setSearchQuery}
      className="p-2 text-secondary-foreground hover:bg-chat-background rounded-full duration-300 focus:outline-none"
      {...props}
    >
      <Icon className="w-6 h-6" />
    </button>
  )
}
