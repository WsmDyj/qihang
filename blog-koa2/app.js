// const Koa = require('koa')
// const app = new Koa()
// const json = require('koa-json')
// const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
// const session = require('koa-generic-session')
// const redisStore = require('koa-redis')
// const cors = require('koa2-cors')

// const compress = require('koa-compress')

// const blog = require('./routes/blog')
// const user = require('./routes/user')
// const actions = require('./routes/actions')

// const check = require('./middleware/check')


// const { REDIS_CONF } = require('./conf/db')
// // error handler
// onerror(app)

// app.use(compress( { threshold: 2048 }))

// app.use(cors({
//   credentials: true,
// }))

// // middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
// app.use(json())
// app.use(logger())

// // logger
// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "http://localhost:8080")
//   ctx.set("Access-Control-Allow-Credentials", "true")
//   ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
//   ctx.set("Access-Control-Allow-Headers", "content-type, authorization")
//   ctx.set("Access-Control-Max-Age", 86400)
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })
// app.use(check) // 校验token

// // session 配置
// app.keys = ['WJiol#23123_']
// app.use(session({
//   saveUninitialized: true,
//   'resave': false,
//   name: 'sid',
//   // 配置cookie
//   cookie: {
//     path: '/', 
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000
//   },
//   // 配置 redis
//   store: redisStore({
//     // all: '127.0.0.1:6379'  // 写死本地的 redis
//     all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
//   }),
// }))

// app.use(blog.routes(), blog.allowedMethods())
// app.use(user.routes(), user.allowedMethods())
// app.use(actions.routes(), actions.allowedMethods())

// // error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

// module.exports = app

var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello Aliyun Node.js,hah\n');
}).listen(80,"0.0.0.0");