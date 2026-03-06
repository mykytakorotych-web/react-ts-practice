import type { User } from "../../types/user.types"

export function ChatName({ userProfile }: { userProfile: User | undefined }) {
  return (
    <div className="flex items-center gap-3">
      {userProfile?.image && (
        <img
          src={userProfile.image}
          alt={userProfile.username}
          className="w-10 h-10 rounded-full bg-primary/10"
        />
      )}
      <div>
        <h1 className="font-medium leading-tight">
          {userProfile?.firstName} {userProfile?.lastName}
        </h1>
        <p className="text-xs text-gray-500">@{userProfile?.username}</p>
      </div>
    </div>
  )
}
