import type { UserPostsResponse } from "../../types/posts.types"

interface ChatMessagesProps {
  postsData: UserPostsResponse | undefined
  isCurrentUser: boolean
}

export function ChatMessages({ postsData, isCurrentUser }: ChatMessagesProps) {
  return postsData?.posts.map(post => (
    <div
      key={post.id}
      className={`mb-4 py-4 px-6 rounded-2xl shadow-sm h-fit w-10/12 ${isCurrentUser ? "bg-primary rounded-br-sm flex self-end" : " bg-window-background rounded-bl-sm"}`}
    >
      <p className={`${isCurrentUser ? "text-background" : "text-foreground"}`}>
        {post.body}
      </p>
    </div>
  ))
}
