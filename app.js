const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handelUserRouter = require('./src/router/user')
// 用于处理post data
const getPostData = (req) => {
  const promise = new Promise((reslove, reject) => {
    if (req.method !== 'POST') {
      reslove({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      reslove({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        reslove({})
        return
      }
      reslove(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')
  // 获取path
  const url = req.url
  req.path = url.split('?')[0]
  // 解析query
  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie 
  req.cookie = {}
  const cookiestr = req.headers.cookie || ''
  cookiestr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 处理postData
  getPostData(req).then(postData => {
    req.body = postData
    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
      res.end(
        JSON.stringify(blogData)
      )
      return
    }
    // 处理 user 路由
    const userData = handelUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }
    // 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
    })
}

module.exports = serverHandle