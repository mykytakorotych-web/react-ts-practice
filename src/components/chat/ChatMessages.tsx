import type { IUserPostsResponse } from "../../types/posts.types"

interface ChatMessagesProps {
  postsData: IUserPostsResponse | undefined
  currentUserId: number | undefined
}

export function ChatMessages({ postsData, currentUserId }: ChatMessagesProps) {
  return postsData?.posts.map(post => {
    const isMyMessage = post.userId === currentUserId

    return (
      <div
        key={post.id}
        className={`py-3 px-5 rounded-2xl shadow-sm h-fit max-w-[85%] wrap-break-word ${
          isMyMessage
            ? "bg-primary rounded-br-sm self-end"
            : "bg-window-background rounded-bl-sm self-start"
        }`}
      >
        <p
          className={`whitespace-pre-wrap sm:wrap-break-word ${
            isMyMessage ? "text-background" : "text-foreground"
          }`}
        >
          {post.body}
        </p>
      </div>
    )
  })
}
