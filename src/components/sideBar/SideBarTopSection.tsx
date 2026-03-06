import { Menu } from "lucide-react"

import { Activity, useState } from "react"
import { DropDownMenu } from "../dropDownMenu/DropDownMenu"
import { SearchInput } from "../ui/SearchInput"

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

      <SearchInput />

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
