import axios, { type AxiosInstance } from 'axios'
import { HttpStatusCode } from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  clearLS,
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS
} from './auth'
import path from 'src/constants/path'
import config from 'src/constants/config'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 1000 * 10,
      headers: {
        'Content-Type': 'application/json'
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
        const { url } = response.config
        const data = response.data
        if (url === path.login || url === path.register) {
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error) {
        if (error?.response.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          // toast.error(message)
        }
        if (error?.response.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
