const router = require('koa-router')()
const {
  getLike,
  removeLike,
  getLikelists
} = require('../controller/actions')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/actions')

router.post('/like', async function(ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.nickname
  await getLike(body)
  ctx.body = new SuccessModel()
})

router.post('/removelike', async function(ctx, next) {
  const val = await removeLike(ctx.request.body.article_id)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('取消失败')
  }
})

router.get('/getLikelists', async function (ctx, next) {
  const author = ctx.query.username || ctx.session.nickname
  const data = await getLikelists(author)
  ctx.body =  new SuccessModel(data)
})
module.exports = router