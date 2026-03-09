import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef } from "react"

import { userService } from "../services/userService"
import { useIsChatOpenStore } from "../store/useIsChatOpenStore"
import { useChatWebSocket } from "./useChatWebSocket"
import { useProfile } from "./useProfile"

export const useUserChat = (userId: string) => {
  const { openChat, closeChat } = useIsChatOpenStore()

  useEffect(() => {
    openChat()
    return () => closeChat()
  }, [openChat, closeChat])

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

  const { sendMessage, isReady } = useChatWebSocket(userId, currentUser?.id)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
  }, [])

  useEffect(() => {
    if (postsData?.posts?.length) {
      const timeoutId = setTimeout(scrollToBottom, 200)
      return () => clearTimeout(timeoutId)
    }
  }, [postsData?.posts?.length, scrollToBottom])

  const isLoading = isPostsLoading || isCurrentUserLoading
  const isCurrentUser = currentUser ? currentUser.id === Number(userId) : false

  return {
    postsData,
    userProfile,
    currentUser,
    isCurrentUser,
    isLoading,
    isUserLoading,
    messagesEndRef,
    isReady,
    sendMessage,
    closeChat,
  }
}
