const router = require('koa-router')()
const {
  getShareLists
} = require('../controller/share')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/share')

router.get('/list', async function (ctx, next) {
  const data = await getShareLists()
  ctx.body =  new SuccessModel(data)
})

module.exports = router