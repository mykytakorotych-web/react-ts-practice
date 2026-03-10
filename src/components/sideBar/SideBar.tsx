import { useSideBarPages } from "../../store/useSideBarPages"
import { SideBarChatPage } from "./SideBarChatPage"
import { SideBarProfilePage } from "./SideBarProfilePage"
import { SideBarSearchPage } from "./SideBarSearchPage"
import { SideBarTopSection } from "./SideBarTopSection"

export function SideBar() {
  const { activePage } = useSideBarPages()

  return (
    <aside className="relative w-full sm:max-w-xs bg-window-background flex flex-col pt-4 border-r-2 border-secondary-foreground/20">
      {activePage === "profile" && <SideBarProfilePage />}

      {activePage !== "profile" && (
        <>
          <SideBarTopSection />

          {activePage === "chats" && <SideBarChatPage />}
          {activePage === "search" && <SideBarSearchPage />}
        </>
      )}
    </aside>
  )
}
