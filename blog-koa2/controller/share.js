const { exec } = require('../db/mysql')

const getShareLists = async () => {
  let sql = `select * from video;`
  const videolists = await exec(sql)
  return videolists
}

module.exports = {
  getShareLists
}
