import axios, { type AxiosInstance } from 'axios'
import { HttpStatusCode } from 'src/constants/httpStatusCode.enum'
import 'react-toastify/dist/ReactToastify.css'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import path from 'src/constants/path'
import config from 'src/constants/config'
import { RefreshTokenResponse } from 'src/type/auth.type'
// import { toast } from 'react-toastify'
import { isAxiosExpiredTokenError } from 'src/utils/utils'
import { toast } from 'react-toastify'
class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 1000 * 10,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token':120 * 60, // 1 =  1s
        // 'expire-refresh-token': 60 * 60 // 1h
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        config.headers.authorization = this.accessToken
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        const data = response.data;
        if (url === path.login || url === path.register) {
          this.accessToken = data.data.access_token;
          this.refreshToken = data.data.refresh_token;
          setAccessTokenToLS(this.accessToken);
          setRefreshTokenToLS(this.refreshToken);
          setProfileToLS(data.data.user);
        } else if (url === path.logout) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS();
        }
        return response
      },
      async (error) => {
        if (error?.response.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message)
        }
        if (error?.response.status === HttpStatusCode.Unauthorized) {
          if (isAxiosExpiredTokenError(error)) {
            const newAccessToken = await this.handleRefreshToken()
            if (newAccessToken) {
              setAccessTokenToLS(newAccessToken)
              return Promise.reject(error)
            }
          }
          clearLS()
        }
        return Promise.reject(error)
      }
    );
  }

  private handleRefreshToken = async (): Promise<string | undefined> => {
      const res = await this.instance.post<RefreshTokenResponse>('/refresh-access-token', {
        refresh_token: this.refreshToken,
      })
      return res.data.data.access_token
  }
}

const http = new Http().instance

export default http
