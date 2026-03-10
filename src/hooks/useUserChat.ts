import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef } from "react"

import { userService } from "../services/userService"
import { useIsChatOpenStore } from "../store/useIsChatOpenStore"
import { checkIs404 } from "../utils/checkIs404"
import { useChatWebSocket } from "./useChatWebSocket"
import { useProfile } from "./useProfile"

export const useUserChat = (userId: string) => {
  const { openChat, closeChat } = useIsChatOpenStore()
  const { user: currentUser, isLoading: isCurrentUserLoading } = useProfile()
  const { sendMessage } = useChatWebSocket(userId, currentUser?.id)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    openChat()
    return () => closeChat()
  }, [openChat, closeChat])

  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => userService.getUserPostsRequest(userId),
    staleTime: Infinity,
  })

  const {
    data: userProfile,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.getUserByIdRequest(userId),
  })

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

  const isNotFound = checkIs404(postsError) || checkIs404(userError)
  const criticalError =
    (!checkIs404(postsError) && postsError) ||
    (!checkIs404(userError) && userError)

  return {
    postsData,
    userProfile,
    currentUser,
    isCurrentUser,
    isLoading,
    isUserLoading,
    messagesEndRef,
    isNotFound,
    criticalError,
    sendMessage,
    closeChat,
  }
}
