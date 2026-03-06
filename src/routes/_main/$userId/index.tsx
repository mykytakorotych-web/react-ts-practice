import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { ChevronLeft } from "lucide-react"
import { Loader } from "../../../components/ui/Loader"
import { Skeleton } from "../../../components/ui/Skeleton"
import { userService } from "../../../services/userService"
import { useIsChatOpen } from "../../../store/useIsChatOpen"

export const Route = createFileRoute("/_main/$userId/")({
  // loader: ({ params }) => userService.getUserPostsRequest(params.userId),

  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const { closeChat } = useIsChatOpen()
  const { data: postsData, isLoading: isPostsLoading } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => userService.getUserPostsRequest(userId),
  })

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.getUserByIdRequest(userId),
  })

  const isLoading = isPostsLoading || isUserLoading

  return (
    <>
      <header className="bg-window-background p-4 h-18 flex items-center gap-4 border-b border-gray-100">
        <button
          className="block sm:hidden text-primary hover:bg-chat-background rounded-full duration-300 p-2"
          onClick={closeChat}
        >
          <ChevronLeft />
        </button>

        {isUserLoading ? (
          <Skeleton width="197px" height="46.5px" />
        ) : (
          <div className="flex items-center gap-3">
            {userProfile?.image && (
              <img
                src={userProfile.image}
                alt={userProfile.username}
                className="w-10 h-10 rounded-full bg-primary/10"
              />
            )}
            <div>
              <h1 className="font-medium leading-tight">
                {userProfile?.firstName} {userProfile?.lastName}
              </h1>
              <p className="text-xs text-gray-500">@{userProfile?.username}</p>
            </div>
          </div>
        )}
      </header>

      <div className="p-4 overflow-y-auto h-max flex flex-col justify-end">
        {isLoading ? (
          <Loader />
        ) : (
          postsData?.posts.map(post => (
            <div
              key={post.id}
              className="mb-4 bg-window-background py-4 px-6 rounded-2xl rounded-bl-sm shadow-sm h-fit w-10/12"
            >
              <p>{post.body}</p>
            </div>
          ))
        )}
      </div>

      <footer></footer>
    </>
  )
}
