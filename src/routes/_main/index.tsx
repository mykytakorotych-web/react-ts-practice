import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/")({
  component: Index,
})

function Index() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4 items-center">
      <span className="px-2 rounded-2xl bg-window-background">
        Select a chat to start messaging
      </span>
    </div>
  )
}
