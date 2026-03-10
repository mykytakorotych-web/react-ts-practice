import { useProfile } from "../../hooks/useProfile"
import { ProfilePageItems } from "../sideBar/ProfilePageItems"
import { Skeleton } from "./Skeleton"

export function ProfileInfo() {
  const { user, isLoading } = useProfile()

  if (isLoading) {
    return <Skeleton count={4} height={68} />
  }

  return (
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
        <span className="text-sm text-secondary-foreground mt-1">online</span>
      </div>

      <ProfilePageItems user={user} />
    </div>
  )
}
