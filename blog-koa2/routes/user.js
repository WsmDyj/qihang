const router = require('koa-router')()
const { login, getUserInfo, updateUser } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api/user')

const jwt = require('jsonwebtoken')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    // 设置 session
    ctx.session.username = data.username
    ctx.session.realname = data.realname

    let payload = {username:data.username,time:new Date().getTime()}
    let secret = 'WJiol#23123_'
    let token = jwt.sign(payload, secret)

    ctx.body = new SuccessModel({accessToken: token,message:'获取token成功'})
    return
  } 
  ctx.body = new ErrorModel({code: 102, message: '用户名或密码错误'})
})

router.get('/getInfo', async function (ctx, next) {
  const username = ctx.session.username
  if (username) {
    const data = await getUserInfo(username)
    ctx.body = new SuccessModel(data)
  } else {
    ctx.body = new ErrorModel('登录失败')
  }
  
})

router.post('/updateUser', async function (ctx, next) {
  const username = ctx.session.username
  const userData = ctx.request.body
  const val = await updateUser(username, userData)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新个人资料失败')
  }
})

module.exports = router
