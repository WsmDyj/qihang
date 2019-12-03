const router = require('koa-router')()
const { login, oauthLogin, register, getUserInfo, updateUser } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { OAUTH_GITHUB } = require('../conf/oauth')
router.prefix('/api/user')
const axios = require('axios')

const jwt = require('jsonwebtoken')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    // 设置 session
    ctx.session.username = data.username
    ctx.session.nickname = data.nickname

    let secret = 'WJiol#23123_'
    
    let payload = {username:data.username, time:new Date().getTime()}
    let token = jwt.sign(payload, secret)

    ctx.body = new SuccessModel({accessToken: token,message:'获取token成功'})
    return
  } 
  ctx.body = new ErrorModel({code: 102, message: '用户名或密码错误'})
})

router.get('/oauth', async function(ctx, next) {
  const requestToken = ctx.request.query.code
  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${OAUTH_GITHUB.clientID}&` +
      `client_secret=${OAUTH_GITHUB.clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  })
  const accessToken = tokenResponse.data.access_token
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  })
  const userData = {
    username: result.data.login,
    avatar: result.data.avatar_url
  }
  const data = await oauthLogin(userData)
  let secret = 'WJiol#23123_'
  if (data) {
    ctx.session.username = data.username
    ctx.session.nickname = data.nickname
    
    let payload = {username:data.username,time:new Date().getTime()}
    let token = jwt.sign(payload, secret)
    ctx.body = new SuccessModel({accessToken: token,message:'获取token成功'})
  } else {
    ctx.session.username = result.data.login
    ctx.session.nickname = result.data.login

    let payload = {username: result.data.login,time:new Date().getTime()}
    let token = jwt.sign(payload, secret)
    ctx.body = new SuccessModel({accessToken: token,message:'获取token成功'})
  }
})

router.post('/register', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const data = await register(username, password)
  if(data) {
    ctx.session.username = username
    ctx.session.nickname = username
    let secret = 'WJiol#23123_'

    let payload = {username: username,time:new Date().getTime()}
    let token = jwt.sign(payload, secret)

    ctx.body = new SuccessModel({accessToken: token,message:'注册成功，欢迎来到起点！'})
    return
  } else {
    ctx.body = new ErrorModel({message: '用户名重复了，请换个名称在试试！'})
  }
})

router.get('/getInfo', async function (ctx, next) {
  const username = ctx.query.username || ctx.session.nickname
  if (username) {
    const data = await getUserInfo(username)
    ctx.body = new SuccessModel(data)
  } else {
    ctx.body = new ErrorModel('登录失败')
  }
})

router.post('/updateUser', async function (ctx, next) {
  const username = ctx.session.username
  const nickname = ctx.session.nickname
  const userData = ctx.request.body
  const val = await updateUser(username, nickname, userData)
  if (val) {
    ctx.session.nickname = userData.nickname
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新个人资料失败')
  }
})

module.exports = router
