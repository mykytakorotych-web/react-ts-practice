import type { IAllUsersResponse, IUser } from "../../types/user.types"
import { Skeleton } from "../ui/Skeleton"
import { SavedMessagesCard } from "./SavedMessagesCard"
import { SideBarUserCard } from "./SideBarUserCard"

interface SideBarChatsPageProps {
  data: IAllUsersResponse | undefined
  isLoading: boolean
  currentUser: IUser | undefined
}

export function SideBarChatsPage({
  data,
  isLoading,
  currentUser,
}: SideBarChatsPageProps) {
  return (
    <>
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
    </>
  )
}
