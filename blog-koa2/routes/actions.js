const router = require('koa-router')()
const {
  getLike,
  removeLike,
  getLikelists,
  getReviews,
  adoptComment
} = require('../controller/actions')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/actions')

router.post('/like',loginCheck, async function(ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.nickname
  await getLike(body)
  ctx.body = new SuccessModel()
})

router.post('/review', async function(ctx, next) {
  const body = ctx.request.body
  await getReviews(body)
  ctx.body = new SuccessModel()
})

router.post('/adopt', async function(ctx, next) {
  const body = ctx.request.body
  await adoptComment(body)
  ctx.body = new SuccessModel()
})


router.post('/removelike',loginCheck, async function(ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.nickname
  const val = await removeLike(body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('取消失败')
  }
})

router.get('/getLikelists', async function (ctx, next) {
  const author = ctx.query.author || ctx.session.nickname
  let page = ctx.query.page || '0'
  const data = await getLikelists(author, page)
  ctx.body =  new SuccessModel(data)
})
module.exports = router