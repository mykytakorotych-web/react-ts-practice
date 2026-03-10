import { Archive, CirclePlay, Plus, Settings, User } from "lucide-react"
import { useProfile } from "../../hooks/useProfile"
import { useIsChatOpenStore } from "../../store/useIsChatOpenStore"
import { useSideBarPages } from "../../store/useSideBarPages"
import { MenuDivider } from "../ui/MenuDivider"
import { MenuItem } from "./MenuItem"
import { MenuLinkItem } from "./MenuLinkItem"
import { MenuProfileHeader } from "./MenuProfileHeader"

export function DropDownMenu() {
  const { user, isLoading } = useProfile()
  const { openChat } = useIsChatOpenStore()
  const { setActivePage } = useSideBarPages()

  return (
    <div className="w-70 bg-window-background rounded-xl shadow-lg border border-gray-100 py-2 flex flex-col">
      <MenuProfileHeader
        user={user}
        isLoading={isLoading}
        onClick={() => setActivePage("profile")}
      />

      <MenuItem icon={Plus} label="Add Account" />

      <MenuDivider />

      {user?.id && <MenuLinkItem userId={user.id} onClick={openChat} />}

      <MenuItem icon={Archive} label="Archived Chats" />
      <MenuItem icon={CirclePlay} label="My Stories" />
      <MenuItem icon={User} label="Contacts" />

      <MenuDivider />

      <MenuItem
        icon={Settings}
        label="Settings"
        isWorking
        onClick={() => setActivePage("profile")}
      />
    </div>
  )
}
