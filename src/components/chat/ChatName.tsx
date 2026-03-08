import type { IUser } from "../../types/user.types"

export function ChatName({ userProfile }: { userProfile: IUser | undefined }) {
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
        <span className="font-medium leading-tight">
          {userProfile?.firstName} {userProfile?.lastName}
        </span>
        <p className="text-xs text-gray-500">@{userProfile?.username}</p>
      </div>
    </div>
  )
}
