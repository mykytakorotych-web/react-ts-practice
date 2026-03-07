import { useSearchPage } from "../../hooks/useSearchPage"
import { Skeleton } from "../ui/Skeleton"
import { Sticker } from "../ui/Sticker"
import { SavedMessagesCard } from "./SavedMessagesCard"
import { SideBarUserCard } from "./SideBarUserCard"

export function SideBarSearchPage() {
  const { data, currentUser, isLoading, searchQuery } = useSearchPage()

  return (
    <>
      {isLoading ? (
        <Skeleton count={5} height="66px" className="rounded-xl" />
      ) : data?.total && data?.total > 0 ? (
        data?.users.map(user => {
          if (user.id !== currentUser?.id) {
            return <SideBarUserCard key={user.id} user={user} />
          } else {
            return <SavedMessagesCard userId={currentUser?.id} />
          }
        })
      ) : (
        <div className="text-center text-secondary-foreground mt-10">
          <Sticker name="i-dont-know" />
          <p className="truncate max-w-xs">
            No results found for "{searchQuery}"
          </p>
        </div>
      )}
    </>
  )
}
