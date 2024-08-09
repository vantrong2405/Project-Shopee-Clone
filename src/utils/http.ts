import axios, { type AxiosInstance } from "axios";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearAccessTokenFormLS, getAccessTokenFromLS, saveAccessTokenToLS } from "./auth";
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 1000 * 10,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use((config) => {
      config.headers.authorization = this.accessToken
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    this.instance.interceptors.response.use((response) => {
      const { url } = response.config
      if (url === '/login' || url === '/register') {
        this.accessToken = response.data.data.access_token
        saveAccessTokenToLS(this.accessToken)
      } else if (url === '/logout') {
        this.accessToken = ''
        clearAccessTokenFormLS()
      }
      return response;
    }, function (error) {
      if (error?.response.status !== HttpStatusCode.UnprocessableEntity) {
        const message = error.response.data.message || error.message
        toast.error(message)
      }
      return Promise.reject(error);
    });
  }
}

const http = new Http().instance

export default http 