import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { userService } from "../services/userService"
import { useIsChatOpen } from "../store/useIsChatOpen"
import { useProfile } from "./useProfile"

export const useUserChat = (userId: string) => {
  const { closeChat } = useIsChatOpen()
  const { data: postsData, isLoading: isPostsLoading } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => userService.getUserPostsRequest(userId),
  })

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.getUserByIdRequest(userId),
  })

  const { user: currentUser, isLoading: isCurrentUserLoading } = useProfile()

  const isLoading = isPostsLoading || isCurrentUserLoading

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [postsData])

  return {
    postsData,
    userProfile,
    isCurrentUser: currentUser && currentUser?.id === +userId,
    isLoading,
    isUserLoading,
    messagesEndRef,
    closeChat,
  }
}
