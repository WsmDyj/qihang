const router = require('koa-router')()
const {
  getLike,
  getLikelists
} = require('../controller/actions')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/actions')

router.post('/like', async function(ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.username
  await getLike(body)
  ctx.body = new SuccessModel()
})
router.get('/getLikelists', async function (ctx, next) {
  const author = ctx.session.username
  const data = await getLikelists(author)
  ctx.body =  new SuccessModel(data)
})
module.exports = router