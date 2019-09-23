## 前言
一转眼九月又过去了，最近没怎么写博客是因为事情太多了，感觉心一直在路上，从来没有时间停下来栖息。从毕业到现在，刚入职便被大量的业务需求所围绕。看到排期已经排到明年的时候我陷入了沉思，曾幻想着利用工作之余的时间做一些自己喜欢做的事。慢慢的发现弱小的身体根本支撑不住。很早买的《深入浅出node.js》翻看的次数也寥寥无几，每当想到这些脸上总会带着一丝惆怅。幸运的是我们老板察觉出来了我的忧愁，放了半天假让我看看书。于是便有机会可以看看node方面的书籍。纸上得来终觉浅，了解大概的node基础知识后蠢蠢欲动，那么跟着我一起学习一下吧！
## 本篇你能学到什么
- [x] 接口，包括node.js处理http请求、搭建开发环境、处理路由、开发各个接口
- [x] 数据存储，MySql建库建表、Node链接MySql、接口对接Mysql
- [x] 登录，cookie和session、使用Redis存储Session
- [x] Ngnix配置，前后端联调
- [x] 日志，Node.js文件操作、stream 流、日志功能的开发、日志文件拆分、日志分析
- [x] 安全，预防SQL、XSS攻击
- [x] Express框架，中间件实现原理、开发api接口、结合常用插件
- [x] koa2框架，
- [x] 线上部署，PM2 介绍和配置、PM2 多进程模型
![需求分析](https://user-gold-cdn.xitu.io/2019/9/19/16d47b515b0c3536?w=1926&h=976&f=png&s=316031)

## 一、博客项目之接口
要开发一个博客项目的 server 端，首先要实现技术方案设计中的各个 API。本章主要讲解如何使用原生 nodejs 处理的 http 请求，包括路由分析和数据返回，然后代码演示各个API的开发。但是本章尚未连接数据库，因此 API 返回的都是假数据。

### 1. 工具准备
* 使用nodemon 检测文件变化，自动重启node
* 使用cross-env 设置环境变量，兼容mac linux 和window
> npm install nodemon cress-env -d --save

新建一个项目名node-blog的文件，用npm init -y 初始化项目。并在package.json配置script,使用 npm run dev 启动我们的项目
```
"dev": "cross-env NODE_ENV=dev nodemon ./bin/api.js",
"prd": "cross-env NODE_ENV=production nodemon ./bin/api.js"
```
### 2. 模块化--目录介绍
```
.node-blog
├── bin // 项目启动文件
├── node_modules
├── src
|   ├── conf // 数据库配置
|   └── controller // 接口api
|   └── db // 数据库链接
|   └── model // 输出格式
|   └──router // 路由
├── app.js
├── package.json

```
### 3. 项目开发
👉在bin下新建一个api.js作为node启动一个服务的模块
```
const http = require('http')
const serverHandle = require('../app')

const PORT = 8000

const server = http.createServer(serverHandle)

server.listen(PORT)
```

👉app.js中创建我们的配置服务配置：
```
const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
}
module.exports = serverHandle
```
👉 在router中创建blog.js、user.js文件，其中blog.js作为博客的路由，这里以获取博客列表的接口为例，其他的接口只是换了一个名字而已：
```
const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST
  const url = req.url
  const path = url.split('?')[0]
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
        msg: '这是获取博客列表的接口'
    }
  }
}

module.exports = handleBlogRouter
```
👉 在app.js中引用创建的路由
```
const handleBlogRouter = require('./src/router/blog')
const handelUserRouter = require('./src/router/user')
const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res) => {
        if (blogData) {
            res.end(JSON.stringify(blogData)
            return 
        }
    }
    // 处理 user 路由
    const userData = handleUserRouter(req, res) => {
        if (userData) {
            res.end(JSON.stringify(userData)
            return 
        }
    }
    // 404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
}
module.exports = serverHandle
```
这里启动我们的服务，输入对应的接口api，就能拿到我们返回的假数据了。关于详细的接口开发。在controller中新建blog.js、user.js处理，这里就不展开。详细可查看[接口开发](https://github.com/WsmDyj/node-blog/tree/master/blog-node/src/controller)
## 二、博客项目之数据存储
API 实现了，就需要连接数据库，实现真正的数据存储和查询，不再使用假数据。本章主要讲解 mysql 的安装、使用，以及用 nodejs 连接 mysql ，最后将 mysql 应用到各个已经开发完的 API 中。

为了降低本幅的篇长，这里将省略如何安装mysql,其实步骤很简单，也不是本文的主要讲解点，这里找了一个还不错的安装教程，可以供大家参考：[mysql安装教程](https://zhuanlan.zhihu.com/p/37152572),另外不习惯操作控制台的可以自行下个图形化界面。我用的是MySql Workbench。

### 1. 创建数据库和数据表
*  利用MySql Workbench创建myBlog数据库，在此数据库下创建blogs、users两张数据表，分别存储博客和用户登录数据
* blogs表创建以自增id作为主键，title、contnet、createtime、author共5个字段；users表创建也以自增id作为主键，username、password、realname共四个字段；下图为blogs和users数据表各字段的结构： ![blogs表](https://user-gold-cdn.xitu.io/2019/9/16/16d38d5f8f343887?w=1120&h=284&f=jpeg&s=168924)
![users表](https://user-gold-cdn.xitu.io/2019/9/16/16d38d78f33b25e6?w=1102&h=232&f=jpeg&s=142522)
### 2. node连接数据库
* 在项目中安装mysql。> npm install mysql
* 在db目录下新建一个mysql.js。用于连接mysql
```
const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
)

// 开始链接
con.connect()

// 执行sql语句的函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })  
  })
  return promise
}

module.exports = {
  exec
}
```
### 3. 接口对接Mysql
在上章中讲到的假数据替换成数据库中的真实数据。在controller目录下的blog、user引入刚创建的mysql.js。在各接口完成mysql语句完成接口对接mysql。所有的接口都是一样的处理，只是执行的sql语句不一样，详细可查看[各接口对接Mysql](https://github.com/WsmDyj/node-blog/tree/master/blog-node/src/controller)，这里以获取数据列表的接口为例：
```
const getList = (author, keyworld) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = '${author}' `
  }
  if (keyworld) {
    sql += `and title like '%${keyworld}%' `
  }
  sql += `order by createtime desc;` 
  return exec(sql)
}
```
## 三、博客项目之登录
### 1. cookie做限制
设置用户名的cookie, 其中getCookieExpires为cookie的过期时间， path=/ 设置所有路由，httpOnly不允许前端更改cookie。
> res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)

步骤：访问login，将用户名密码传过去，验证登录，登录之后将用户信息写入到cookie返回前端。通过cookie测试判断有无登录。
```
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
```
## 四、博客项目之日志
日志记录和日志分析是 server 端的重要模块，前端涉及较少。本章主要讲解如何使用原生 nodejs 实现日志记录、日志内容分析和日志文件拆分。其中包括 stream readline 和 crontab 等核心知识点。
### 1. stream介绍和使用
什么是stream?   👉[官方解释](http://nodejs.cn/api/stream.html)
> 流（stream）是 Node.js 中处理流式数据的抽象接口。 stream 模块用于构建实现了流接口的对象。流可以是可读的(Readable)、可写的(Writable)、或者可读可写的(Duplex)。抽象理解为两个水桶通过水管链接，将其中的一个水桶的水满满流入到另一个水桶。

stream能做什么？ 👉 IO（网络IO和文件IO）操作的性能瓶颈，如何在有限的硬件资源下提高IO的操作效率。


stream(流) 拷贝代码演示 ：
```
const fs = require('fs')
const path= require('path')
// 两个文件名
const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')
// 读取文件的 stream 对象
const readStream = fs.createReadStream(fileName1)
// 写入文件的 stream 对象
const writeStream = fs.createWriteStream(fileName2)
// 执行拷贝，通过pipe
readStream.pipe(writeStream)
// 监听每次拷贝的内容
readStream.on('data', chunk => {
  console.log(chunk.toString())
})
// 数据读取完成，即拷贝完成
readStream.on('end', () => {
  console.log('copy done')
})
```

### 2.写日志
在blog-node的目录下新建一个logs文件夹,在其下面新建access.log、error.log、event.log。并在src下新建一个utils > log.js 这里就以access为例子，其代码为：
```
const fs = require('fs')
const path = require('path')

// 写日志
function writeLog (writeStream, log) {
  writeStream.write(log + '\n')
}

// 生成 write stream
function createWriteStream (fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access (log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}
```
在app.js中引入刚写的log.js文件中access方法并在serverHandle方法中记录access log。当我们的接口被执行的时候就会记录接口的信息等。
> access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

### 3.日志拆分
* 按时间划分日志文件，如2019-09-18.access.log
* 实现方式：linux的crontab命令，即定时任务

在src新建一个utils > copy.sh 写入sh命令。执行sh copy.sh,在上小节创建的logs会多出一个文件名为2019-09-17.access.log 文件名即完成日志拆分。下面是sh命令：
```
!/bin/sh
cd /Users/wusimin7/Documents/jd_code/node-blog/blog-node/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log

```
在我们的总项目下执行crontab -e 创建定时任务。输入以下内容。wq!保存后通过crontab -l 查看刚创建的crontab命令。
> *0 * * * sh /Users/wusimin7/Documents/jd_code/node-blog/blog-node/src/utils/copy.sh

## 五、博客项目之安全
安全是 server 端需要考虑的重点内容，本章主要讲解 nodejs 如何防范 sql 注入，xss 攻击，以及数据库的密码加密 —— 以防被黑客获取明文密码。
### 1. sql注入
* 最原始、最简单的攻击
* 攻击方法：输入一个sql片段，最终拼接成一段攻击代码
* 预防错误：使用mysql的 escape 函数处理输入内容(从server端考虑)

攻击方法演示： 👉
在我们的sql中输入
> select username, realname from users where username='zhangsan'-- and password="123";

这个sql语句中能查出用户名"zhangsan",密码就不会显示，被 -- 所注释了。利用这个就可以进行sql注入攻击了
![sql注入攻击](https://user-gold-cdn.xitu.io/2019/9/20/16d4c663eeb710a7?w=926&h=96&f=png&s=15120)
你会发现只输入用户名也能登入。这就是简单的sql注入攻击了。当然这个跟你登录查询的sql语句有关。

escape 函数预防 👉 利用mysql中的escape函数包裹我们的登录名和密码
```
//  db文件夹下导出escape函数。在user.js中引用
escape: mysql.escape

username = escape(username)
password = escape(password)
```
### 2. xss攻击
* 攻击方式： 在页面展示的内容中掺杂js代码，以获取网页信息
* 预防措施： 转换生成js的特殊字符,（npm install xss -d --save）

攻击方法演示： 👉
在新建博客的时候标题输入下面内容即可查看本网站的cookie。
```
<script>alert(document.cookie)</script>
```
### 3. 密码加密
在utils > crpy.js 加密文件
```
const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'WJiol_8776#'

// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}
module.exports = {
  genPassword
}
```
在controller > user.js中引入genPassword方法对输入的密码加密
> password = genPassword(password)
## 六、使用 express 重构博客项目
### express安装（使用脚手架express-generator）
> npm install express-generator -g

通过 express express-test 命令生成一个项目。npm install 去下载依赖包运行npm start 访问localhist:3000。再安装监听文件的修改
> npm install nodemon cross-env --save-dev

再package.json新增一个scripts命令: 
> "dev": "cross-env NODE_ENV=dev nodemon ./bin/www"

### express中app.js介绍
1. http-errors 处理404
2. cookie-parser 解析cookie
3. morgan 自动生成日志
4. app.use(express.json()); 处理post data
5. app.use(express.urlencoded({ extended: false })); post兼容其他格式

### express中间件
新建一个项目：repress-test，初始化npm init -y，安装express： npm i express。新建一个app.js。[app.js中的代码](https://github.com/WsmDyj/node-blog/blob/express/express-test/app.js)。通过next()链式调用，实现express中间件的执行过程
### express开发接口
 * 安装插件 mysql xss  >  npm i mysql xss --save -d
 * mysql controller resModel相关代码可以复用
 * 初始化路由
## 七、使用 Koa2 重构博客项目
## 八、上线与配置