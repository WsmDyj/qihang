const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handelUserRouter = (req, res) => {
  const method = req.method // GET POST
  // 登录
  if(method === 'POST' && req.path === '/api/user/login') {
    const { username, passworld } = req.body
    const result = loginCheck(username, passworld)
    if (result) {
      return new SuccessModel()
    }
    return new ErrorModel('登录失败')
  }
}

module.exports = handelUserRouter