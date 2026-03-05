import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import Cookies from "js-cookie"
import { authService } from "../services/authService"

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      if (formData !== null && formData.get("password") !== null) {
        loginMutation.mutate({
          username: formData.get("username")?.toString() || "",
          password: formData.get("password")?.toString() || "",
        })
        navigate({ to: "/" })
      } else {
        throw new Error("Username and password are required")
      }
    } catch (err) {
      console.error("Failed to login", err)
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
