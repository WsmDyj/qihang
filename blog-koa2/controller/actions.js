const { exec } = require('../db/mysql')
const getLike = async (actionsdData = {}) => {
  const author = actionsdData.author
  const article_id = actionsdData.article_id
  const sqlArticle = `update blogs set likeCount = likeCount + 1 where article_id='${article_id}' `
  const sqlLikes = `insert into likes (like_author, article_id) values ('${author}', ${article_id}) `
  const updataData = await exec(sqlArticle)
  const insertData = await exec(sqlLikes)
  if (updataData.affectedRows > 0 && insertData.affectedRows > 0) {
    return true
  } else {
    return false
  }
}

const getLikelists = async (author) => {
  const sql = `SELECT blogs.article_id,author,title,content,createtime,likeCount,markdown FROM blogs, likes where likes.like_author = '${author}' and likes.article_id = blogs.article_id;`
  return await exec(sql)
}
module.exports = {
  getLike,
  getLikelists
}