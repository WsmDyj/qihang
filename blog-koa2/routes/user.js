const router = require('koa-router')()
const { login, getUserInfo, updateUser } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    // 设置 session
    ctx.session.username = data.username
    ctx.session.realname = data.realname

    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

router.get('/getInfo', async function (ctx, next) {
  const username = ctx.session.username
  const data = await getUserInfo(username)
  ctx.body = new SuccessModel(data)
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
