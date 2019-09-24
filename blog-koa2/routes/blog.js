const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list',async function (ctx, next) {
  const query = ctx.query
  ctx.body = {
    error: 0,
    data: ['获取博客列表'],
    query: query
  }
})


module.exports = router
