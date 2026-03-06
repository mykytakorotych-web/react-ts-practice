import { Search } from "lucide-react"

export function SearchInput() {
  return (
    <div className="group flex-1 relative">
      <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-foreground transition-colors group-focus-within:text-primary" />

      <input
        id="searchInput"
        name="searchInput"
        type="text"
        placeholder="Search"
        className="w-full bg-chat-background text-foreground rounded-full py-2 pl-10 pr-4 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}
