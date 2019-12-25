const router = require('koa-router')()
const {
  getList,
  newQuestion,
  getDetail,
  updateQuestion
} = require('../controller/question')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/question')

router.get('/list', async function (ctx, next) {
  let author = ctx.query.author || ''
  
  let filters = ctx.query
  
  const listData = await getList(author, filters)
  ctx.body =  new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.ask_id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.nickname
  const data = await newQuestion(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const val = await updateQuestion(ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新问题失败')
  }
})


module.exports = router
