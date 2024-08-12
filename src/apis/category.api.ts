import { Category } from "src/type/category.type"
import { SuccessResponse } from "src/type/utils.type"
import http from "src/utils/http"

const URL = '/categories'

const categoryApi = {
  getCategory: () => {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi