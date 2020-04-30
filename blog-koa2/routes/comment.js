const router = require('koa-router')()
const {
  newComment,
  newReply,
  getComment
} = require('../controller/comment')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/comment')

router.post('/new',loginCheck, async(ctx, next) => {
  const body = ctx.request.body
  body.comment_author = ctx.session.nickname
  const data = await newComment(body)
  ctx.body = new SuccessModel(data)
})

router.post('/newReply', loginCheck, async(ctx, next) => {
  const body = ctx.request.body
  body.comment_author = ctx.session.nickname
  const data = await newReply(body)
  ctx.body = new SuccessModel(data)
})
router.get('/getComment', async(ctx, next) => {
  let article_id = ctx.query.article_id || ''
  const data = await getComment(article_id)
  ctx.body = new SuccessModel(data)
})
module.exports = router