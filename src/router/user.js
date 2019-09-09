const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString() 
}

const handelUserRouter = (req, res) => {
  const method = req.method // GET POST
  // 登录
  if(method === 'GET' && req.path === '/api/user/login') {
    // const { username, passworld } = req.body
    const { username, passworld } = req.query
    const result = login(username, passworld)
    if (result) {
      res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)
      return new SuccessModel()
    }
    return new ErrorModel('登录失败')
  }


  // 登录验证测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username) {
      return new SuccessModel({username: req.cookie.username})
    }
    return new ErrorModel('尚未登录')
  }
}

module.exports = handelUserRouter