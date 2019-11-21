const Promise = require("bluebird")
const jwt = require('jsonwebtoken')
const { ErrorModel } = require('../model/resModel')

const verify = Promise.promisify(jwt.verify)
let secret = 'WJiol#23123_'
 
async function check(ctx, next) {
  let url = ctx.request.url;
  if (url == '/api/user/login'|| url === '/api/blog/list' || '/api/blog/detail') {
    await next();
  } else {
      // 规定token写在header 的 'autohrization' 
    let token = ctx.request.headers["authorization"]
    // 解码
    let payload = await verify(token,secret)
    let timeout = 24 * 60 * 60 * 1000
    let { time } = payload
    let data = new Date().getTime()
    console.log(token)
    if (!token) {
      ctx.body = (new ErrorModel({code: 50013, message:'token无效'}))
    }
    if (data - time <= timeout) {
        // 未过期
      await next()
    } else {
        //过期
        ctx.body = (new ErrorModel({code: 50014, message:'token 已过期'}))
    }
  }
}
 
module.exports = check