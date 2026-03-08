import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"
import type { IPost, IUserPostsResponse } from "../types/posts.types"

export const useChatWebSocket = (
  userId: string,
  currentUserId: number | undefined,
) => {
  const queryClient = useQueryClient()
  const wsRef = useRef<WebSocket | null>(null)

  const [isReady, setIsReady] = useState(false)

  const addMessageToCache = useCallback(
    (newMessage: IPost) => {
      queryClient.setQueryData(
        ["userPosts", userId],
        (oldData: IUserPostsResponse | undefined) => {
          if (!oldData)
            return { posts: [newMessage], total: 1, skip: 0, limit: 10 }
          return {
            ...oldData,
            posts: [...oldData.posts, newMessage],
            total: oldData.total + 1,
          }
        },
      )
    },
    [queryClient, userId],
  )

  useEffect(() => {
    const ws = new WebSocket("wss://ws.postman-echo.com/raw")
    wsRef.current = ws

    ws.onopen = () => setIsReady(true)
    ws.onclose = () => setIsReady(false)

    ws.onmessage = event => {
      try {
        const incomingMessage = JSON.parse(event.data)

        if (String(incomingMessage.chatId) === String(userId)) {
          if (currentUserId && String(userId) === String(currentUserId)) {
            return
          }

          addMessageToCache({
            id: +crypto.randomUUID(),
            body: incomingMessage.body,
            userId: Number(userId),
          })
        }
      } catch (error: unknown) {
        console.warn(
          "JSON parsing error:",
          error instanceof Error ? error.message : "Unknown",
        )
      }
    }

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        ws.readyState === WebSocket.OPEN
      ) {
        ws.close()
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [userId, currentUserId, addMessageToCache])

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !currentUserId) return

      const messagePayload = {
        id: +crypto.randomUUID(),
        body: text.trim(),
        userId: currentUserId,
        chatId: userId,
      }

      addMessageToCache(messagePayload)

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(messagePayload))
      } else {
        console.warn("WebSocket is not open.")
      }
    },
    [userId, currentUserId, addMessageToCache],
  )

  return { sendMessage, isReady }
}
