const { exec } = require('../db/mysql')
const {getUserInfo} = require('./user')
const { getFollowList } = require('./follow')

const getList = async (author, filters) => {
  const tagPage = Number(filters.page) * 15
  let sql = `select * from myBlog.questions where 1=1 `
  if (author) {
    sql += `and author = '${author}' `
  }
  if (filters.articleTag != '全部') {
    sql += `and articleTag like '%${filters.articleTag}%'`
  }
  if (filters.status != 0) {
    sql += `and status = '${filters.status}'`
  }
  sql += `order by createtime desc ` 
  // if (author) {
  //   sql += `and author = '${author}' `
  //   sql += `order by createtime desc ` 
  // } else {
  //   sql += `order by createtime desc ` 
  //   sql += `limit ${tagPage} , 20;`
  // }
  if (tagPage >= 0) {
    sql += `limit ${tagPage}, 15;`
  }
  const lists = await exec(sql)
  for (let i =0;i <lists.length; i++) {
    // const userInfo = await getUserInfo(lists[i].author)
    // const follow = await getFollowList(lists[i].author)
    lists[i].articleTag = lists[i].articleTag.split(',')
    // lists[i].author = userInfo
    // Object.assign(lists[i].author, {followInfo: follow})
  }
  return lists
}

const getListHot = async () => {
  let sql = `select question_id, title, likeCount, comments from myBlog.questions order by comments desc limit 0, 5;`
  const lists = await exec(sql)
  return lists
}

const getAnswerList = async (author) => {
  let sql = `select questions.author, question_id, title, content, markdown, createtime, comments, reviews, status from myBlog.questions inner join myBlog.comment on  comment.comment_author = '${author}' and questions.question_id = comment.article_id;`
  const lists = await exec(sql)
  return lists
}

const getDetail = async (id) => {
  const sql = `select * from questions where question_id = '${id}' `
  const question = await exec(sql)

  const userInfo = await getUserInfo(question[0].author)
  question[0].articleTag = question[0].articleTag.split(',')
  question[0].author = userInfo
  return question[0]
}

const getDelete = async (id) => {
  const sql = `delete from questions where question_id='${id}';`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  }
  return false
}


const newQuestion = async (blogData = {}) => {
  // blogData 是一个博客对象， 包含title content author属性
  const title = blogData.title
  const content = blogData.content
  const markdown = blogData.markdown
  const author = blogData.author
  const question_id = blogData.question_id
  const createtime = Date.now()
  const articleTag = blogData.articleTag
  const sql = `insert into questions (question_id, title, content, createtime, author, markdown, articleTag) values ('${question_id}','${title}','${content}','${createtime}','${author}', "${markdown}", '${articleTag}'); `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateQuestion = async (blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const markdown = blogData.markdown
  const question_id = blogData.question_id
  const articleTag = blogData.articleTag
  const sql = `update questions set articleTag='${articleTag}', title='${title}', content='${content}',markdown='${markdown}' where question_id = '${question_id}'; `
  const updataData = await exec(sql)
  if (updataData.affectedRows > 0) {
    return true
  } 
  return false
}

module.exports = {
  getList,
  getListHot,
  getDelete,
  newQuestion,
  getDetail,
  getAnswerList,
  updateQuestion
}
