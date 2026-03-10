import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import Cookies from "js-cookie"
import type { SubmitEvent } from "react"
import { authService } from "../services/authService"

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
    type: "login" | "register",
  ) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")?.toString().trim()
    const password = formData.get("password")?.toString().trim()

    if (!username || !password) {
      console.warn("Username and password are required")
      return
    }

    if (type === "login" || type === "register") {
      loginMutation.mutate({ username, password })
    }
  }

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      Cookies.set("accessToken", data.accessToken, { expires: 1, secure: true })
      Cookies.set("refreshToken", data.refreshToken, {
        expires: 7,
        secure: true,
      })
      queryClient.setQueryData(["authUser"], data)

      navigate({ to: "/" })
    },
  })

  const logout = () => {
    Cookies.remove("accessToken")
    Cookies.remove("refreshToken")
    queryClient.removeQueries({ queryKey: ["authUser"] })
    navigate({ to: "/login" })
  }

  return {
    isPending: loginMutation.isPending,
    error: loginMutation.error,
    handleSubmit,
    logout,
  }
}
