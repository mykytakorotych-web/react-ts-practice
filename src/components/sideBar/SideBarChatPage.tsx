import { useSideBarChatPage } from "../../hooks/useSideBarChatPage"
import { SideBarChatsPage } from "./SideBarChatsPage"

export function SideBarChatPage() {
  const { currentUser, data, isLoading } = useSideBarChatPage()

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
        <SideBarChatsPage
          data={data}
          isLoading={isLoading}
          currentUser={currentUser}
        />
      </div>
    </>
  )
}
