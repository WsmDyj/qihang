const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next()
    return
  } 
  ctx.body = (new ErrorModel('您还未登录！请先登录在进行操作'))
}