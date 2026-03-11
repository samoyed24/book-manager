import router from "@/router";
import { useUserAuthStore } from "@/stores/auth";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

export interface APIResponse<T = any> {
  code: number
  message: string
  data: T | null
}

export class APIError extends Error {
  errCode?: number
  errMsg?: string

  constructor({ errCode, errMsg }: { errCode: number | undefined, errMsg: string | undefined }) {
    super()
    this.name = 'APIError'
    this.message = 'APIError'
    this.errMsg = errMsg
    this.errCode = errCode
  }
}

const user = useUserAuthStore()

const request = {
  async get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return axios.get<APIResponse<T>>(url, { params, ...config })
      .then((res: AxiosResponse<APIResponse<T>>) => {
        const response = res.data
        if (!String(response.code).startsWith('2')) {
          const err = new APIError({
            errCode: response.code,
            errMsg: response.message,
          })
          throw err
        }
        return response
      })
      .catch((err: AxiosError | APIError) => {
        if (err instanceof AxiosError) {
          const apiErr = new APIError({
            errCode: err.response?.status,
            errMsg: err.message,
          })
          throw apiErr
        } else throw err
      })
      .catch((err: APIError) => {
        if (String(err.errCode).startsWith('5')) {
          ElMessage.error(`Errcode: ${err.errCode} ${err.errMsg}`)
        } else if (String(err.errCode) === '401') {
          ElMessage.warning('您的登录状态已过期，请重新登录')
          user.clearUser()
          router.push('/auth')
        }
        throw err
      })
  },

  async post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return axios.post<APIResponse<T>>(url, data, config)
      .then((res: AxiosResponse<APIResponse<T>>) => {
        const response = res.data
        if (!String(response.code).startsWith('2')) {
          const err = new APIError({
            errCode: response.code,
            errMsg: response.message,
          })
          throw err
        }
        return response
      })
      .catch((err: AxiosError | APIError) => {
        if (err instanceof AxiosError) {
          const apiErr = new APIError({
            errCode: err.response?.status,
            errMsg: err.message,
          })
          throw apiErr
        } else throw err
      })
      .catch((err: APIError) => {
        if (String(err.errCode).startsWith('5')) {
          ElMessage.error(`Errcode: ${err.errCode} ${err.errMsg}`)
        } else if (String(err.errCode) === '401') {
          ElMessage.warning('您的登录状态已过期，请重新登录')
          user.clearUser()
          router.push('/auth')
        }
        throw err
      })
  },
}

export default request