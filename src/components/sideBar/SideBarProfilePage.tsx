import { ChevronLeft } from "lucide-react"
import { useProfile } from "../../hooks/useProfile"
import { useSideBarPages } from "../../store/useSideBarPages"
import { Skeleton } from "../ui/Skeleton"
import { ProfilePageItems } from "./ProfilePageItems"
import { TopSectionButton } from "./TopSectionButton"

export function SideBarProfilePage() {
  const { user, isLoading } = useProfile()
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
      {isLoading ? (
        <Skeleton count={4} height={68} />
      ) : (
        <div className="flex-1 overflow-y-auto pb-6">
          <div className="flex flex-col items-center mt-6 mb-6">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.username}
                className="w-28 h-28 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-primary/20 flex items-center justify-center text-3xl text-primary">
                {user?.firstName?.[0]}
              </div>
            )}
            <h2 className="text-2xl font-medium mt-4 text-foreground">
              {user?.firstName} {user?.lastName}
            </h2>
            <span className="text-sm text-secondary-foreground mt-1">
              online
            </span>
          </div>

          <ProfilePageItems user={user} />
        </div>
      )}
    </>
  )
}
