export interface IUser {
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

export interface IAllUsersResponse {
  users: IUser[]
  total: number
  skip: number
  limit: number
}
