import { apiClient } from "../api/client"
import type { UserPostsResponse } from "../types/posts.types"
import type { RequestParams } from "../types/request.type"
import type { AllUsersResponse, User } from "../types/user.types"

export const userService = {
  async getMeRequest(): Promise<User> {
    const { data } = await apiClient.get<User>("/user/me")
    return data
  },

  async getAllUsersRequest(params?: RequestParams): Promise<AllUsersResponse> {
    const { data } = await apiClient.get<AllUsersResponse>("/users", {
      params,
    })
    return data
  },

  async getUserPostsRequest(userId: string): Promise<UserPostsResponse> {
    const { data } = await apiClient.get<UserPostsResponse>(
      `/posts/user/${userId}`,
    )
    return data
  },

  async getUserByIdRequest(userId: string): Promise<User> {
    const { data } = await apiClient.get<User>(`/users/${userId}`)
    return data
  },
}
