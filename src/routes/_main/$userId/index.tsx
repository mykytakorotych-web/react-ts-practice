import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/$userId/")({
  // loader: ({ params }) => fetchUser(params.userId),

  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()

  return <div>Hello "/_main/{userId}/"!</div>
}
