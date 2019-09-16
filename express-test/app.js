const express = require('express')

// 当前
const app = express()

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  // 假设处理 cookie
  req.cookie = {
    userId: 'abc123'
  }
  next()
})

app.use((req, res, next) => {
  // 假设处理 post data
  // 异步
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    } 
    next()
  })
})

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('处理 get /api 路由')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('处理 post /api 路由')
  next()
})

app.get('/api/get-cookie', (req, res, next) => {
  console.log('get /api/get-cookie')
  res.json({
    error: 0,
    data: req.cookie
  })
})

app.post('/api/get-post-data',(req, res, next) => {
  console.log('post /api/get-post-data')
  res.json({
    error: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('处理404')
  res.json({
    error: -1,
    msg: '404 not found'
  })
})

app.listen(3001, () => {
  console.log('prot 3001 is running')
})