const { exec } = require('../db/mysql')
const {getUserInfo} = require('./user')

const getComment = async (article_id) => {
  const sql = `SELECT article_id,comment_conent,comment_author, comment_status, comment_time as time, comment_id FROM comment where comment.article_id = '${article_id}' order by comment_time desc;`
  const selectAuthorsql = `SELECT users.autograph, username, avatar, company, job, nickname from users, comment where users.nickname = comment.comment_author;`
  const author = await exec(selectAuthorsql)
  const comments = await exec(sql)
  for (var i = 0; i<comments.length;i++) {
    const replys = await exec(`SELECT reply.reply_conent,reply_author,reply_time as time,comment_author as nickname,reply_id, users.avatar, users.job from reply, users where users.nickname = reply.comment_author and reply.comment_id = '${comments[i].comment_id}' order by reply_time desc;`)
    comments[i].replys = replys
    for (var j= 0; j<author.length;j++) {
      if (comments[i].comment_author == author[j].nickname) {
        comments[i].userInfo = author[j]
      }
    }
  }
  return comments
}

const newComment = async (commentData = {}) => {
  const article_id = commentData.article_id
  const comment_conent = commentData.comment_conent
  const comment_author = commentData.comment_author
  const comment_Type = commentData.type
  // const comment_likes = commentData.comment_likes
  const comment_time = Date.now()
  const comment_id = commentData.comment_id
  let sqlArticle = `update blogs set blogs.comments = blogs.comments + 1 where article_id='${article_id}';`
  if (comment_Type === 'question') {
    sqlArticle = `update questions set questions.comments = questions.comments + 1 where question_id='${article_id}';`
  }
  const sql =  `insert into comment (article_id, comment_conent, comment_author, comment_time, comment_id) values ('${article_id}','${comment_conent}','${comment_author}', '${comment_time}', '${comment_id}' ); `
  const insertData = await exec(sql)
  const updataData = await exec(sqlArticle)
  if (updataData.affectedRows > 0 && insertData.affectedRows > 0) {
    return true
  } else {
    return false
  }
}
const newReply = async (commentData = {}) => {
  const comment_id = commentData.comment_id
  const reply_conent = commentData.reply_conent
  const reply_author = commentData.reply_author
  const comment_author = commentData.comment_author
  const reply_id = commentData.reply_id
  const article_id = commentData.article_id
  const reply_time = Date.now()
  const sql =  `insert into reply (article_id, comment_id, reply_conent, reply_author,comment_author, reply_time,reply_id) values ('${article_id}','${comment_id}','${reply_conent}','${reply_author}','${comment_author}','${reply_time}','${reply_id}'); `
  let sqlArticle = `update blogs set comments = comments + 1 where article_id='${article_id}';`
  const insertData = await exec(sql)
  const updataData = await exec(sqlArticle)
  if (updataData.affectedRows > 0 && insertData.affectedRows > 0) {
    return true
  } else {
    return false
  }
}

module.exports = {
  newComment,
  newReply,
  getComment
}