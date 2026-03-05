import {
  Archive,
  Bookmark,
  CirclePlay,
  Plus,
  Settings,
  User,
} from "lucide-react"
import { useProfile } from "../../hooks/useProfile"
import { Loader } from "../ui/Loader"
import { MenuItem } from "./MenuItem"

export function DropDownMenu() {
  const { user, isLoading } = useProfile()

  return (
    <div className="w-70 bg-window-background rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 py-2 flex flex-col">
      <button className="w-full flex items-center px-4 py-2.5 hover:bg-gray-100 transition-colors text-left">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="relative mr-4 rounded-full p-0.5 border-2 border-primary">
              <img
                src={user?.image || "/android-chrome-192x192.png"}
                alt="Mykyta"
                className="w-7 h-7 rounded-full object-cover"
              />
            </div>
            <span className="flex-1 text-[15px] font-medium text-foreground">
              {user?.firstName || "Username"}
            </span>
          </>
        )}
      </button>

      <MenuItem icon={Plus} label="Add Account" />

      <div className="h-px bg-gray-200 my-1.5 mx-2" />

      <MenuItem icon={Bookmark} label="Saved Messages" />
      <MenuItem icon={Archive} label="Archived Chats" badge={39} />
      <MenuItem icon={CirclePlay} label="My Stories" />
      <MenuItem icon={User} label="Contacts" />

      <div className="h-px bg-gray-200 my-1.5 mx-2" />

      <MenuItem icon={Settings} label="Settings" />
    </div>
  )
}
