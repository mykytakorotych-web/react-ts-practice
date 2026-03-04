import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_main")({
  component: MainLayout,
})

function MainLayout() {
  return (
    <div className="flex h-screen w-full">
      <aside className="w-80 border-r bg-window-background">
        Список чатов...
      </aside>

      <main className="flex-1 bg-chat-background">
        <Outlet />
      </main>
    </div>
  )
}
