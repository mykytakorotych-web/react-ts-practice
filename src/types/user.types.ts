export interface User {
  id: number
  username: string
  email: string
  phone: string
  firstName: string
  lastName: string
  gender: string
  birthDate: string
  image: string
}

export interface AllUsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
