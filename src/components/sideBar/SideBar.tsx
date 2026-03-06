import { useQuery } from "@tanstack/react-query"
import { useProfile } from "../../hooks/useProfile"
import { userService } from "../../services/userService"
import { Skeleton } from "../ui/Skeleton"
import { SavedMessagesCard } from "./SavedMessagesCard"
import { SideBarTopSection } from "./SideBarTopSection"
import { SideBarUserCard } from "./SideBarUserCard"

export function SideBar() {
  const { data, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["allUsers", { limit: 10, skip: 0 }],
    queryFn: () => userService.getAllUsersRequest({ limit: 10, skip: 0 }),
  })

  const { user: currentUser, isLoading: isProfileLoading } = useProfile()

  const isLoading = isLoadingUsers || isProfileLoading

  return (
    <aside className="relative w-full sm:max-w-xs bg-window-background flex flex-col py-4 border-r-2 border-secondary-foreground/20 ">
      <SideBarTopSection />
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
        <SavedMessagesCard userId={currentUser?.id} />
        {isLoading ? (
          <Skeleton count={5} height="66px" className="rounded-xl" />
        ) : (
          data?.users.map(user => {
            if (user.id !== currentUser?.id) {
              return <SideBarUserCard key={user.id} user={user} />
            }
          })
        )}
      </div>
    </aside>
  )
}
