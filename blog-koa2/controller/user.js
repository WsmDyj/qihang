const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
  username = escape(username)
   // 生成密码加密
  password = genPassword(password)
  password = escape(password)

  const sql = `select * from users where username=${username} and password=${password} `
  
  const rows = await exec(sql)
  return rows[0] || {}
}

const oauthLogin = async (userData = {}) => {
  const username = userData.username
  const nickname = userData.username
  const avatar = userData.avatar
  const date = Date.now()
  const userSql = `select * from users where username = '${username}' `
  const rows = await exec(userSql)
  if (rows.length > 0) {
    return rows[0] || {}
  } else {
    password = genPassword(123)
    const sql = `insert into users (username,password, nickname, avatar, date) values ('${username}', '${password}', '${nickname}', '${avatar}', '${date}');`
    const insertData = await exec(sql)
    if (insertData.affectedRows > 0) {
      return false
    }
  }
}

const register = async(username, password) => {
  const nickname = username
  const date = Date.now()
  const userSql = `select * from users where username = '${username}' `
  const rows = await exec(userSql)
  if (rows.length > 0) {
    return false
  } else {
    password = genPassword(password)
    const sql = `insert into users (username, password, nickname, date) values ('${username}', '${password}', '${nickname}', '${date}');`
    const insertData = await exec(sql)
    if (insertData.affectedRows > 0) {
      return true
    }
  }
}

const getUserInfo = async (username) => {
  let sql = `select autograph, avatar, company, job, username, nickname, date from users where nickname = '${username}';`
  let reviewsSql = `select reviews from blogs where author = '${username}';`
  let commentsSql = `select comments from blogs where author = '${username}';`
  let likesSql = `select likeCount from blogs where author = '${username}';`
  const rows = await exec(sql)
  const _reviews = await exec(reviewsSql)
  const _comments = await exec(commentsSql)
  const _likes = await exec(likesSql)
  var s = 0, sum = 0, t = 0;
  _reviews.forEach(item => {
    s += item.reviews
  })
  _comments.forEach(item => {
    sum += item.comments
  })
  _likes.forEach(item => {
    t += item.likeCount
  })
  rows[0].reviews = s
  rows[0].comments = sum
  rows[0].likes = t
  return rows[0] || {}
}

const updateUser = async (username,nickname, userData = {}) => {
  const sql = `update users set nickname='${userData.nickname}', avatar='${userData.avatar}', job='${userData.job}', autograph='${userData.autograph}', company='${userData.company}' where username= '${username}'; `
  const blogSql = `update blogs set author='${userData.nickname}' where author ='${nickname}';`
  const commentSql = `update comment set comment_author='${userData.nickname}' where comment_author ='${nickname}';`
  const likesSql = `update likes set like_author='${userData.nickname}' where like_author ='${nickname}';`
  const replySql = `update reply set reply_author ='${userData.nickname}' where reply_author ='${nickname}';`
  const replycommentSql = `update reply set comment_author='${userData.nickname}' where comment_author ='${nickname}';`
  const followSql = `update follows set follow_author ='${userData.nickname}' where follow_author ='${nickname}';`
  const followingSql = `update follows set following_author='${userData.nickname}' where following_author ='${nickname}';`
  const updateData = await exec(sql)
  await exec(blogSql)
  await exec(commentSql)
  await exec(likesSql)
  await exec(replySql)
  await exec(replycommentSql)
  await exec(followSql)
  await exec(followingSql)
  if (updateData.affectedRows > 0) {
    return true
  } 
  return false
}
module.exports = {
  login,
  oauthLogin,
  register,
  getUserInfo,
  updateUser
}