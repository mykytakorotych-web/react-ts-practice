import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import Cookie from "js-cookie"
import { SideBar } from "../../components/sideBar/SideBar"
import { useIsChatOpen } from "../../store/useIsChatOpen"

export const Route = createFileRoute("/_main")({
  beforeLoad: () => {
    const token = Cookie.get("accessToken")

    if (!token) {
      throw redirect({
        to: "/login",
      })
    }
  },
  component: MainLayout,
})

function MainLayout() {
  const { isOpen } = useIsChatOpen()

  return (
    <div className="relative flex h-screen w-full overflow-hidden sm:overflow-auto">
      <SideBar />
      <main
        className={`absolute top-0 right-0 w-full h-full bg-chat-background flex flex-col transition-transform duration-300 sm:relative sm:flex-1 sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}
