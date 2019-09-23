import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json' // 配置请求头// 用Form Data形式提交数据
// 返回一个Promise(发送post请求)
export function fetchpost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params ? JSON.stringify(params) : '').then(res => {
      resolve(res)
    })
  })
}
// 返回一个Promise(发送get请求)
export function fetchget (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(res => {
        resolve(res.data)
      }, err => {
        if (err.data) {
          reject(err.data)
        } else {
        }
      }).catch(error => {
        reject(error)
      })
  })
}
