import { apiClient } from "../api/client"
import type { ILoginUser, LoginData } from "../types/auth.types"

export const authService = {
  async login(loginData: LoginData): Promise<ILoginUser> {
    const { data } = await apiClient.post("/auth/login", {
      username: loginData.username,
      password: loginData.password,
      expiresInMins: 60,
    })
    return data
  },
}
