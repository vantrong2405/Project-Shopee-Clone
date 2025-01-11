import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>

export interface ExpiredTokenErrorData {
  data: {
    name: string;
  };
}


export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>