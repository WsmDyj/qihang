import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '../store/modules/user'

const service = axios.create({
  // timeout: 5000,
  baseURL: 'http://localhost:8000',
  withCredentials: true,
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
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
    if ( res.code === 50014 || res.status === 500) {
      MessageBox.confirm(
        '您登录以过期，请重新登录',
        '登录过期',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        UserModule.ResetToken()
        UserModule.handleIslogin(true)
      })
    }
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