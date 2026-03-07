import type { LucideIcon } from "lucide-react"

interface SearchQueryState {
  Icon: LucideIcon
  setSearchQuery: () => void
}

export function TopSectionButton({ Icon, setSearchQuery }: SearchQueryState) {
  return (
    <button
      onClick={setSearchQuery}
      className="p-2 text-secondary-foreground hover:bg-chat-background rounded-full duration-300 focus:outline-none"
    >
      <Icon className="w-6 h-6" />
    </button>
  )
}
