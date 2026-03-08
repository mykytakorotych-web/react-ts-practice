import { apiClient } from "../api/client"
import type { IPost, IUserPostsResponse } from "../types/posts.types"
import type { IRequestParams } from "../types/request.type"
import type { IAllUsersResponse, IUser } from "../types/user.types"

export const userService = {
  async getMeRequest(): Promise<IUser> {
    const { data } = await apiClient.get<IUser>("/user/me")
    return data
  },

  async getAllUsersRequest(
    params?: IRequestParams,
  ): Promise<IAllUsersResponse> {
    const { data } = await apiClient.get<IAllUsersResponse>("/users", {
      params,
    })
    return data
  },

  async getUserPostsRequest(userId: string): Promise<IUserPostsResponse> {
    const { data } = await apiClient.get<IUserPostsResponse>(
      `/posts/user/${userId}`,
    )
    return data
  },

  async getUserByIdRequest(userId: string): Promise<IUser> {
    const { data } = await apiClient.get<IUser>(`/users/${userId}`)
    return data
  },

  async searchUsersRequest(query: string): Promise<IAllUsersResponse> {
    const { data } = await apiClient.get<IAllUsersResponse>("/users/search", {
      params: { limit: 10, q: query },
    })
    return data
  },

  async addPostRequest(userId: number, content: string): Promise<IPost> {
    const { data } = await apiClient.post<IPost>("/posts/add", {
      userId,
      body: content,
    })
    return data
  },
}
