const { exec } = require('../db/mysql')
const {getUserInfo} = require('./user')
const { getFollowList } = require('./follow')

const getList = async (author, page, articleTag) => {
  const tagPage = Number(page) * 10
  let sql = `select blogs.article_id, title, ellipsis, createtime, comments, reviews, articleTag, articleImg, author,likeCount, users.avatar from myBlog.blogs inner join myBlog.users on  blogs.author = users.nickname `
  if (author) {
    sql += `and blogs.author = '${author}' and users.nickname = '${author}' `
  }
  if (articleTag !== '全部') {
    sql += `and articleTag like '%${articleTag}%' `
  }
  sql += `order by createtime desc`
  
  if (tagPage >= 0) {
    sql += ` limit ${tagPage} , 10;`
  }
  
  const lists = await exec(sql)

  return lists
}

const getDetail = async (id) => {
  const sqlArticle = `select blogs.article_id, markdown, title, createtime, content, author, articleImg, comments, reviews, likeCount, users.avatar from blogs inner join users on article_id = '${id}' `
  const articles = await exec(sqlArticle)
  // const userInfo = await getUserInfo(articles[0].author)
  // articles[0].author = userInfo
  return articles[0]
}

const getSearchlists = async (keyworld) => {
  let articleSql = `select * from blogs where title like '%${keyworld}%';`
  let userSql = `select * from users where nickname like '%${keyworld}%';`
  const articlelists = await exec(articleSql)
  const userlists = await exec(userSql)
  let searchList = {
    articles: articlelists,
    users: userlists
  }
  return searchList
}

const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象， 包含title content author属性
  const title = blogData.title
  const content = blogData.content
  const ellipsis = blogData.ellipsis
  const markdown = blogData.markdown
  const author = blogData.author
  const articleImg = blogData.articleImg
  const article_id = blogData.article_id
  const createtime = Date.now()
  const articleType = blogData.type
  const articleTag = blogData.tags
  const sql = `insert into blogs (article_id, title, content, createtime, author, markdown, articleImg, articleType, articleTag, ellipsis) values ('${article_id}','${title}','${content}','${createtime}','${author}', "${markdown}", '${articleImg}', '${articleType}', '${articleTag}', '${ellipsis}'); `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}
const updateBlog = async (blogData = {}) => {
  // id 更新博客 blogData 是一个博客对象， 包含title content
  const title = blogData.title
  const content = blogData.content
  const markdown = blogData.markdown
  const ellipsis = blogData.ellipsis
  const articleImg = blogData.articleImg
  const article_id = blogData.article_id
  const articleType = blogData.type
  const articleTag = blogData.tags
  const sql = `update blogs set articleType='${articleType}', ellipsis='${ellipsis}', articleTag='${articleTag}', title='${title}', content='${content}',markdown='${markdown}', articleImg='${articleImg}' where article_id='${article_id}' `
  const updataData = await exec(sql)
  if (updataData.affectedRows > 0) {
    return true
  } 
  return false
}
const delBlog = async (id, author) => {
  const sql = `delete from blogs where article_id='${id}';`
  const delData = await exec(sql)
  if (delData.affectedRows > 0) {
    return true
  } 
  return false
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
  getSearchlists
}
