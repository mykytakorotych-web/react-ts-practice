import axios from "axios"
import Cookies from "js-cookie"
import { router } from "../main"

export const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(config => {
  const token = Cookies.get("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshTokenPromise: Promise<string> | null = null

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true

      try {
        if (!refreshTokenPromise) {
          const refreshToken = Cookies.get("refreshToken")
          if (!refreshToken) throw new Error("Refresh token not found")

          refreshTokenPromise = axios
            .post("https://dummyjson.com/auth/refresh", {
              refreshToken: refreshToken,
              expiresInMins: 60,
            })
            .then(({ data }) => {
              Cookies.set("token", data.accessToken, { secure: true })
              Cookies.set("refreshToken", data.refreshToken, { secure: true })
              return data.accessToken
            })
            .catch(err => {
              Cookies.remove("token")
              Cookies.remove("refreshToken")
              router.navigate({ to: "/login" })
              throw err
            })
            .finally(() => {
              refreshTokenPromise = null
            })
        }

        const newAccessToken = await refreshTokenPromise

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
