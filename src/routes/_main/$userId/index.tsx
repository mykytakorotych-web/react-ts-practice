import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { ChevronLeft } from "lucide-react"
import { Loader } from "../../../components/ui/Loader"
import { userService } from "../../../services/userService"
import { useIsChatOpen } from "../../../store/useIsChatOpen"

export const Route = createFileRoute("/_main/$userId/")({
  // loader: ({ params }) => userService.getUserPostsRequest(params.userId),

  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const { closeChat } = useIsChatOpen()
  const { data, isLoading } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => userService.getUserPostsRequest(userId),
  })

  return (
    <>
      <header className="bg-window-background p-4 h-18 flex items-center gap-4">
        <button className="block sm:hidden text-primary" onClick={closeChat}>
          <ChevronLeft />
        </button>
        <h1>Chat with User {userId}</h1>
      </header>
      <main className="p-4">
        {isLoading ? (
          <Loader />
        ) : (
          data?.posts.map(post => (
            <div key={post.id}>
              <p>{post.body}</p>
            </div>
          ))
        )}
      </main>
      <footer></footer>
    </>
  )
}
