import { ChevronLeft } from "lucide-react"
import { useSideBarPages } from "../../store/useSideBarPages"
import { ProfileInfo } from "../ui/ProfileInfo"
import { TopSectionButton } from "./TopSectionButton"

export function SideBarProfilePage() {
  const { setActivePage } = useSideBarPages()

  return (
    <>
      <div className="flex items-center justify-between p-4 pt-0 h-14.5 border-b-2 border-secondary-foreground/20">
        <div className="flex items-center gap-6">
          <TopSectionButton
            id="profile-back-button"
            aria-label="Go back to chats"
            Icon={ChevronLeft}
            setSearchQuery={() => setActivePage("chats")}
          />
          <h1 className="text-xl font-medium text-foreground">Settings</h1>
        </div>
      </div>
      <ProfileInfo />
    </>
  )
}
