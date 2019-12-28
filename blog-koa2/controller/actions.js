const { exec } = require('../db/mysql')

const getLike = async (actionsdData = {}) => {
  const author = actionsdData.author
  const article_id = actionsdData.article_id
  const sqlArticle = `update blogs set likeCount = likeCount + 1 where article_id='${article_id}';`
  const sqlLikes = `insert into likes (like_author, article_id) values ('${author}', '${article_id}');`
  const updataData = await exec(sqlArticle)
  const insertData = await exec(sqlLikes)
  if (updataData.affectedRows > 0 && insertData.affectedRows > 0) {
    return true
  } else {
    return false
  }
}
const getReviews = async (actionsdData = {}) => {
  const article_id = actionsdData.article_id
  const type = actionsdData.type
  let sql = ''
  if (type == 'ask') {
    sql = `update questions set reviews = reviews + 1 where question_id='${article_id}';`
  } else {
    sql = `update blogs set reviews = reviews + 1 where article_id='${article_id}';`
  }
  const updataData = await exec(sql)
  if (updataData.affectedRows > 0) {
    return true
  } else {
    return false
  }
}

const adoptComment = async (actionsdData = {}) => {
  const comment_id = actionsdData.comment_id
  const comment_status = actionsdData.comment_status
  const sqlArticle = `update comment set comment_status = '${comment_status}' where comment_id='${comment_id}';`
  const updataData = await exec(sqlArticle)

  const article_id = actionsdData.askId
  const sqlAsk = `select comment_status from comment where article_id = '${article_id}' `
  const AskData = await exec(sqlAsk)

  var result = AskData.some(item => {
    if (item.comment_status == '1') {
      return true
    }
  })
  if (result) {
    const sqlQuestion = `update questions set status = 2 where question_id='${article_id}';`
    await exec(sqlQuestion)
  } else{
    const sqlQuestion = `update questions set status = 1 where question_id='${article_id}';`
    await exec(sqlQuestion)
  }

  if (updataData.affectedRows > 0) {
    return true
  } else {
    return false
  }
}

const removeLike = async (actionsdData = {}) => {
  const author = actionsdData.author
  const article_id = actionsdData.article_id
  const sqlArticle = `update blogs set likeCount = likeCount - 1 where article_id='${article_id}' `
  const sql = `delete from likes where article_id='${article_id}' and like_author='${author}';`
  const updataData = await exec(sqlArticle)
  const delData = await exec(sql)
  if (updataData.affectedRows > 0 && delData.affectedRows > 0) {
    return true
  } 
  return false
}



const getLikelists = async (author) => {
  const sql = `SELECT blogs.article_id, author, title, content, createtime,likeCount, markdown, articleImg, comments, reviews FROM blogs, likes where likes.like_author = '${author}' and likes.article_id = blogs.article_id order by likes.id desc;`
  return await exec(sql)
}

module.exports = {
  getLike,
  removeLike,
  getLikelists,
  getReviews,
  adoptComment
}