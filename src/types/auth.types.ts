import type { IUser } from "./user.types"

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface LoginData {
  username: string
  password: string
}

export interface ILoginUser extends IUser, ITokens {}
