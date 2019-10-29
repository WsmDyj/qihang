import axios from 'axios'

const service = axios.create({
  timeout: 5000,
  baseURL: 'localhost:8080',
})

service.interceptors.request.use((config: any) => {
  return config
}, (error: any) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: any) => {
  const res = response.data
  return res.code === 200 ?  Promise.resolve(res) :  Promise.reject(res)
}, (error: any) => {
  return Promise.reject(error)
})

export default service