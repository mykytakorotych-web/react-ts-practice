import { Menu, Search } from "lucide-react"

import { Activity, useState } from "react"
import { DropDownMenu } from "../dropDownMenu/DropDownMenu"

export function SideBarTopSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex gap-2 border-b-2 border-secondary-foreground/20 px-4 pb-4">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 text-secondary-foreground hover:bg-chat-background rounded-full duration-300 focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="group flex-1 relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-secondary-foreground transition-colors group-focus-within:text-primary" />

        <input
          type="text"
          placeholder="Search"
          className="w-full bg-chat-background text-foreground rounded-full py-2 pl-10 pr-4 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary"
        />
      </div>
      <Activity mode={isMenuOpen ? "visible" : "hidden"}>
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMenuOpen(false)}
        />

        <div className="absolute top-15 left-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
          <DropDownMenu />
        </div>
      </Activity>
    </div>
  )
}
