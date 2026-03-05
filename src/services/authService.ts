import { apiClient } from "../api/client"
import type { LoginData, LoginUser } from "../types/auth.types"

export const authService = {
  async login(loginData: LoginData): Promise<LoginUser> {
    const { data } = await apiClient.post("/auth/login", {
      username: loginData.username,
      password: loginData.password,
      expiresInMins: 60,
    })
    return data
  },
}
