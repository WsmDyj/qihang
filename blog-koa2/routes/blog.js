const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
  getSearchlists
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  let author = ctx.query.author || ''
  const page = ctx.query.page || '0'
  
  const listData = await getList(author, page)
  ctx.body =  new SuccessModel(listData)
})

router.get('/search', async (ctx, next) => {
  const keyword = ctx.query.keyword || ''
  const listData = await getSearchlists(keyword)
  ctx.body =  new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.get('/tags', async (ctx, next) => {
  const data = [
    { 
      label: '1', 
      value: '前端', 
      options: [
        { value: 'Vue', laber: '1' },
        { value: 'React', laber: '2' },
        { value: 'JavaScript', laber: '3' },
        { value: 'CSS', laber: '4' },
        { value: 'Node', laber: '5' },
        { value: 'Flutter', laber: '6' },
        { value: 'Webpack', laber: '7' },
        { value: 'TypeScript', laber: '8' },
        { value: 'Http', laber: '9' },
        { value: 'Docker', laber: '10' },
        { value: '性能优化', laber: '11' },
        { value: '微信小程序', laber: '12' }]
    },
    // {
    //   label: '2',
    //   value: '后端',
    //   options: [
    //     { value: 'Java', laber: '1' },
    //     { value: 'Spring Boot', laber: '2' },
    //     { value: 'Go', laber: '3' },
    //     { value: 'Spring', laber: '4' },
    //     { value: 'Redis', laber: '5' },
    //     { value: 'Spring Cloud', laber: '6' },
    //     { value: 'Mysql', laber: '7' },
    //     { value: 'Linux', laber: '8' },
    //     { value: 'Docker', laber: '9' }]
    // },
    {
      label: '2',
      value: '阅读',
      options: [
        { value: '读书笔记', laber: '0' },
        { value: '面试交流', laber: '1' },
        { value: '生活随笔', laber: '2' },
      ]
    }
  ]
  ctx.body = new SuccessModel(data)
})

router.post('/new', async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.nickname
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const val = await updateBlog(ctx.request.body)
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
