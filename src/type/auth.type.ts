import { User } from "./user.type";
import { RespponseApi } from "./utils.type";

export type AuthResponse = RespponseApi<{
  access_token: string,
  expires: string,
  user: User
}>


