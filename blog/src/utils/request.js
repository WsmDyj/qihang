import axios from 'axios'

const server = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true, // cookie
  timeout: 5000
})
server.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截
server.interceptors.request.use(
  config => {
    return config
  }, error => {
    return Promise.reject(error)
  }
)

// 响应拦截
server.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  }, error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 404:
          console.log('网络请不可用')
      }
    }
    return Promise.reject(error.response)
  }
)

export default service