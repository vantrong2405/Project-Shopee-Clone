import { User } from 'src/type/user.type'
import { SuccessResponse } from 'src/type/utils.type'
import http from 'src/utils/http'

export interface BodyUpdateProfileData extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email' | '__v'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  updateProfile(body: BodyUpdateProfileData) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}


export default userApi
