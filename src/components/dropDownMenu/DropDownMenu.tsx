import { Link } from "@tanstack/react-router"
import {
  Archive,
  Bookmark,
  CirclePlay,
  Plus,
  Settings,
  User,
} from "lucide-react"
import { useProfile } from "../../hooks/useProfile"
import { useIsChatOpenStore } from "../../store/useIsChatOpenStore"
import { useSideBarPages } from "../../store/useSideBarPages"
import { Loader } from "../ui/Loader"
import { MenuItem } from "./MenuItem"

export function DropDownMenu() {
  const { user, isLoading } = useProfile()
  const { openChat } = useIsChatOpenStore()
  const { setActivePage } = useSideBarPages()

  return (
    <div className="w-70 bg-window-background rounded-xl shadow-lg border border-gray-100 py-2 flex flex-col">
      <button
        className="w-full flex items-center px-4 py-2.5 hover:bg-gray-100 transition-colors text-left"
        onClick={() => setActivePage("profile")}
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

      <MenuItem icon={Plus} label="Add Account" />

      <div className="h-px bg-gray-200 my-1.5 mx-2" />

      <Link
        to={"/$userId"}
        params={{ userId: `${user?.id}` }}
        className="w-full flex items-center px-4 py-2.5 hover:bg-gray-100 transition-colors text-left"
        onClick={() => openChat()}
      >
        <Bookmark className="w-5 h-5 text-gray-500 mr-4 stroke-[1.5]" />

        <span className="flex-1 text-[15px] font-medium text-foreground">
          Saved Messages
        </span>
      </Link>
      <MenuItem icon={Archive} label="Archived Chats" />
      <MenuItem icon={CirclePlay} label="My Stories" />
      <MenuItem icon={User} label="Contacts" />

      <div className="h-px bg-gray-200 my-1.5 mx-2" />

      <MenuItem
        icon={Settings}
        label="Settings"
        isWorking
        onClick={() => setActivePage("profile")}
      />
    </div>
  )
}
