import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef } from "react"

import { userService } from "../services/userService"
import { useIsChatOpenStore } from "../store/useIsChatOpenStore"
import { useProfile } from "./useProfile"
// Импортируем наш новый хук
import { useChatWebSocket } from "./useChatWebSocket"

export const useUserChat = (userId: string) => {
  const { openChat, closeChat } = useIsChatOpenStore()

  const { data: postsData, isLoading: isPostsLoading } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => userService.getUserPostsRequest(userId),
    staleTime: Infinity,
  })

  const { data: userProfile, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.getUserByIdRequest(userId),
  })

  const { user: currentUser, isLoading: isCurrentUserLoading } = useProfile()

  const isLoading = isPostsLoading || isCurrentUserLoading

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [postsData, scrollToBottom])

  const { sendMessage } = useChatWebSocket(
    userId,
    currentUser?.id,
    scrollToBottom,
  )

  return {
    postsData,
    userProfile,
    currentUser,
    isCurrentUser: currentUser && currentUser?.id === +userId,
    isLoading,
    isUserLoading,
    messagesEndRef,
    closeChat,
    handleSend: sendMessage,
    openChat,
  }
}
