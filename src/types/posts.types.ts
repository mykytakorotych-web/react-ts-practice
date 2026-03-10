export interface IPost {
  id: number | string
  title?: string
  body: string
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  views?: number
  userId?: number
}

export interface IUserPostsResponse {
  posts: IPost[]
  total: number
  skip?: number
  limit?: number
}
