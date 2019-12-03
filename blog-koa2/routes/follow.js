const router = require('koa-router')()
const {
  getFollow,
  getUnfollow,
  getFollowList
} = require('../controller/follow')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/follow')

router.post('/following',loginCheck, async function(ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.nickname
  await getFollow(body)
  ctx.body = new SuccessModel()
})

router.post('/unfollow',loginCheck, async function(ctx, next) {
  const body = ctx.request.body
  body.author = ctx.session.nickname
  await getUnfollow(body)
  ctx.body = new SuccessModel()
})

router.get('/list',loginCheck, async function(ctx, next) {
  const username = ctx.query.username || ctx.session.nickname
  const data = await getFollowList(username)
  ctx.body =  new SuccessModel(data)
})
module.exports = router