const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handelUserRouter = require('./src/router/user')
const { get, set } = require('./src/db/redis')
// // session 数据
// const SESSION_DATA = {}

// 获取cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString() 
}

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

  // // 解析session
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  // 解析session 使用redis
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化 redis session
    set(userId, {})
  }
  // 获取 session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      // 初始化 redis中的 session
      set(req.sessionId, {})
      // 设置 session
      req.session = {}
    } else {
      req.session = sessionData
    }
    return getPostData(req)
  })
  .then(postData => {
    req.body = postData
    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }
    
    const userResult = handelUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
    })
}

module.exports = serverHandle