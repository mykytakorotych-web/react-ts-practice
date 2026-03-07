import { useSideBar } from "../../hooks/useSideBar"
import { SideBarChatsPage } from "./SideBarChatsPage"
import { SideBarSearchPage } from "./SideBarSearchPage"
import { SideBarTopSection } from "./SideBarTopSection"

export function SideBar() {
  const { currentUser, data, isLoading, searchQuery } = useSideBar()

  return (
    <aside className="relative w-full sm:max-w-xs bg-window-background flex flex-col pt-4 border-r-2 border-secondary-foreground/20">
      {/* {isProfile ? (
        Profile
      ) : ( */}
      <>
        <SideBarTopSection />
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {searchQuery ? (
            <SideBarSearchPage />
          ) : (
            <SideBarChatsPage
              data={data}
              isLoading={isLoading}
              currentUser={currentUser}
            />
          )}
        </div>
      </>
      {/* )} */}
    </aside>
  )
}
