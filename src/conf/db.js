const dev = process.env.NODE_DEV // 环境变量

// 配置 
let MYSQL_CONF 
if (dev === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
}
if (dev === 'production') { // 线上环境
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
  }
}
module.exports = {
  MYSQL_CONF
}