const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handelUserRouter = (req, res) => {
  const method = req.method // GET POST
  // 登录
  if(method === 'GET' && req.path === '/api/user/login') {
    const { username, passworld } = req.query
    const result = login(username, passworld)
    return result.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录验证测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({session: req.session}))
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = handelUserRouter