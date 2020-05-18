const router = require('koa-router')()
const {
  getShareLists
} = require('../controller/share')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/share')

router.get('/list', async function (ctx, next) {
  let type = ctx.query.type
  const data = await getShareLists(type)
  ctx.body =  new SuccessModel(data)
})

module.exports = router