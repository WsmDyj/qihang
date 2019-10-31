import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Message } from 'element-ui'
import { UserModule } from '../store/modules/user'

const service = axios.create({
  timeout: 5000,
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

service.interceptors.request.use((config) => {
  if (UserModule.token) {
    config.headers['authorization'] = UserModule.token
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse) => {
  const res = response.data
  if (res.errno === 0) {
    return Promise.resolve(res)
  } else {
    Message({
      message: res.data.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res)
  }
}, (error: any) => {
  Message({
    message: error.message || 'Error',
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service