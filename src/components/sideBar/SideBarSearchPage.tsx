import { useSearchPage } from "../../hooks/useSearchPage"
import { Skeleton } from "../ui/Skeleton"
import { Sticker } from "../ui/Sticker"
import { SavedMessagesCard } from "./SavedMessagesCard"
import { SideBarUserCard } from "./SideBarUserCard"

export function SideBarSearchPage() {
  const { data, currentUser, isLoading, searchQuery } = useSearchPage()

  if (isLoading) {
    return <Skeleton count={5} height="66px" className="rounded-xl" />
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
      {!data?.users || data.users.length === 0 ? (
        <div className="text-center text-secondary-foreground mt-10">
          <Sticker name="i-dont-know" fetchPriority="high" />
          <p className="truncate max-w-xs">
            No results found for "{searchQuery}"
          </p>
        </div>
      ) : (
        data?.users.map(user => {
          if (user.id !== currentUser?.id) {
            return <SideBarUserCard key={user.id} user={user} />
          } else {
            return <SavedMessagesCard key={user.id} userId={currentUser?.id} />
          }
        })
      )}
    </div>
  )
}
