const { exec } = require('../db/mysql')

const login = (username, passworld) => {
  const sql = `select username, realname from users where username='${username}' and passworld='${passworld}' `
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  login
}