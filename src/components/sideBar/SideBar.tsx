import { useQuery } from "@tanstack/react-query"
import { userService } from "../../services/userService"
import { Loader } from "../ui/Loader"
import { SideBarTopSection } from "./SideBarTopSection"
import { SideBarUserCard } from "./SideBarUserCard"

export function SideBar() {
  const { data, isLoading } = useQuery({
    queryKey: ["allUsers", { limit: 10, skip: 0 }],
    queryFn: () => userService.getAllUsersRequest({ limit: 10, skip: 0 }),
  })

  return (
    <aside className="relative w-full sm:max-w-xs bg-window-background flex flex-col py-4 border-r-2 border-secondary-foreground/20 ">
      <SideBarTopSection />

      <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
        {isLoading ? (
          <Loader />
        ) : (
          data?.users.map(user => <SideBarUserCard key={user.id} user={user} />)
        )}
      </div>
    </aside>
  )
}
