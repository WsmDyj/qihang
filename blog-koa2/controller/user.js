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

const getUserInfo = async (username) => {
  let sql = `select autograph, avatar, company, job, nickname from users where username= '${username}' `
  const rows = await exec(sql)
  return rows[0] || {}
}
const updateUser = async (username, userData = {}) => {
  // id 更新用户名 userData 是一个用户对象， 包含nickname avatar authorgraph job company
  const sql = `update users set nickname='${userData.nickname}', avatar='${userData.avatar}', job='${userData.job}', autograph='${userData.autograph}', company='${userData.company}' where username= '${username}' `
  const updataData = await exec(sql)
  if (updataData.affectedRows > 0) {
    return true
  } 
  return false
}
module.exports = {
  login,
  getUserInfo,
  updateUser
}