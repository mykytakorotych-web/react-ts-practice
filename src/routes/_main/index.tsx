import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/")({
  component: Index,
})

function Index() {
  return <h1>Giga Chat</h1>
}
