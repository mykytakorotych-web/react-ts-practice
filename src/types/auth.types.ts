import type { User } from "./user.types"

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface LoginData {
  username: string
  password: string
}

export interface LoginUser extends User, Tokens {}
