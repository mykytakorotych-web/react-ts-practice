import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useRef } from "react"
import type { UserPostsResponse } from "../types/posts.types"

export const useChatWebSocket = (
  userId: string,
  currentUserId: number | undefined,
  scrollToBottom: () => void,
) => {
  const queryClient = useQueryClient()
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (currentUserId && String(userId) === String(currentUserId)) {
      return
    }
    const ws = new WebSocket("wss://ws.postman-echo.com/raw")
    wsRef.current = ws

    ws.onmessage = event => {
      try {
        const incomingMessage = JSON.parse(event.data)

        if (String(incomingMessage.chatId) === String(userId)) {
          const botReply = {
            id: crypto.randomUUID(),
            body: `WebSocket: ${incomingMessage.body}`,
            userId: Number(userId),
            chatId: incomingMessage.chatId,
          }

          queryClient.setQueryData(
            ["userPosts", userId],
            (oldData: UserPostsResponse | undefined) => {
              if (!oldData) {
                return {
                  posts: [botReply],
                  total: 1,
                  skip: 0,
                  limit: 10,
                }
              }

              return { ...oldData, posts: [...oldData.posts, botReply] }
            },
          )

          setTimeout(scrollToBottom, 100)
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.warn(`JSON parsing error: ${error.message}`)
        } else {
          console.warn("An unknown error occurred")
        }
        console.log("Received non-JSON message:", event.data)
      }
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [userId, queryClient, scrollToBottom, currentUserId])

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !currentUserId) return

      const messagePayload = {
        id: crypto.randomUUID(),
        body: text.trim(),
        userId: currentUserId,
        chatId: userId,
      }

      queryClient.setQueryData(
        ["userPosts", userId],
        (oldData: UserPostsResponse | undefined) => {
          if (!oldData)
            return { posts: [messagePayload], total: 1, skip: 0, limit: 10 }
          return { ...oldData, posts: [...oldData.posts, messagePayload] }
        },
      )
      setTimeout(scrollToBottom, 50)

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(messagePayload))
      }
    },
    [userId, currentUserId, queryClient, scrollToBottom],
  )

  return { sendMessage }
}
