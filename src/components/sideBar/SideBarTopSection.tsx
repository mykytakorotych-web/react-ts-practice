import { ChevronLeft, Menu } from "lucide-react"

import { Activity } from "react"
import { useSideBarTopSection } from "../../hooks/useSideBarTopSection"
import { DropDownMenu } from "../dropDownMenu/DropDownMenu"
import { SearchInput } from "../ui/SearchInput"
import { TopSectionButton } from "./TopSectionButton"

export function SideBarTopSection() {
  const { isMenuOpen, setIsMenuOpen, activePage, handleBackButton } =
    useSideBarTopSection()

  return (
    <div className="flex gap-2 border-b-2 border-secondary-foreground/20 px-4 pb-4">
      {activePage === "chats" ? (
        <TopSectionButton
          id="sidebar-menu-toggle"
          aria-label="Open main menu"
          Icon={Menu}
          setSearchQuery={() => setIsMenuOpen(!isMenuOpen)}
        />
      ) : (
        <TopSectionButton
          id="search-back-button"
          aria-label="Go back to chats"
          Icon={ChevronLeft}
          setSearchQuery={() => handleBackButton()}
        />
      )}

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
