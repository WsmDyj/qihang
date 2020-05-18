const { exec } = require('../db/mysql')

const getShareLists = async (type) => {
  let sql = `select * from video where type= '${type}';`
  const videolists = await exec(sql)
  return videolists
}

module.exports = {
  getShareLists
}
