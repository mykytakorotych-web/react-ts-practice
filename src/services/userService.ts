import { apiClient } from "../api/client"
import type { Post, UserPostsResponse } from "../types/posts.types"
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

  async searchUsersRequest(query: string): Promise<AllUsersResponse> {
    const { data } = await apiClient.get<AllUsersResponse>("/users/search", {
      params: { limit: 10, q: query },
    })
    return data
  },

  async addPostRequest(userId: number, content: string): Promise<Post> {
    const { data } = await apiClient.post<Post>("/posts/add", {
      userId,
      body: content,
    })
    return data
  },
}
