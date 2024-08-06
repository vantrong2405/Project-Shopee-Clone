import axios, { type AxiosInstance } from "axios";
import { HttpStatusCode } from "src/constants/httpStatusCode.enum";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 1000 * 10,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.response.use(function (response) {
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