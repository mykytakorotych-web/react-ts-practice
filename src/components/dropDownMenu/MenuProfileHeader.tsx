import type { IUser } from "../../types/user.types"
import { Loader } from "../ui/Loader"

interface MenuProfileHeaderProps {
  user: IUser | undefined
  isLoading: boolean
  onClick: () => void
}

export function MenuProfileHeader({
  user,
  isLoading,
  onClick,
}: MenuProfileHeaderProps) {
  return (
    <button
      className="w-full flex items-center px-4 py-2.5 hover:bg-gray-100 transition-colors text-left"
      onClick={onClick}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="relative mr-4 rounded-full p-0.5 border-2 border-primary">
            <img
              src={user?.image || "/android-chrome-192x192.png"}
              alt="User Name"
              className="w-7 h-7 rounded-full object-cover"
            />
          </div>
          <span className="flex-1 text-[15px] font-medium text-foreground">
            {user?.firstName
              ? `${user?.firstName} ${user?.lastName}`
              : "Username"}
          </span>
        </>
      )}
    </button>
  )
}
