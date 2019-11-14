const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list',async function (ctx, next) {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  if (ctx.query.isadmin) {
    console.log('is admin')
    // 管理员界面
    if (ctx.session.username == null) {
      console.error('is admin, but no login')
      // 未登录
      ctx.body = (new ErrorModel('未登录'))
      return
    }
    // 强制查询自己的博客
    author = ctx.session.username
  }
  const listData = await getList(author, keyword)
  ctx.body =  new SuccessModel(listData)
})

router.get('/detail',async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.nickname
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const val = await updateBlog(ctx.request.query.id, ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/del', async (ctx, next) => {
  const val = await delBlog(ctx.request.body.id)
  if (val) {
    ctx.body = new SuccessModel({message: '删除博客成功'})
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
