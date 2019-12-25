const { exec } = require('../db/mysql')
const {getUserInfo} = require('./user')
const { getFollowList } = require('./follow')

const getList = async (author, page) => {
  const tagPage = Number(page) * 10
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = '${author}' `
    sql += `order by createtime desc ` 
  } else {
    sql += `order by createtime desc ` 
    sql += `limit ${tagPage} , 10;`
  }
  const lists = await exec(sql)
  for (let i =0;i<lists.length; i++) {
    const userInfo = await getUserInfo(lists[i].author)
    const follow = await getFollowList(lists[i].author)
    lists[i].articleTag = lists[i].articleTag.split(',')
    lists[i].author = userInfo
    Object.assign(lists[i].author, {followInfo: follow})
  }
  return lists
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

const getDetail = async (id) => {
  const sqlArticle = `select * from blogs where article_id = '${id}' `
  const articles = await exec(sqlArticle)

  const userInfo = await getUserInfo(articles[0].author)
  articles[0].articleTag = articles[0].articleTag.split(',')
  articles[0].author = userInfo
  return articles[0]
}

const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象， 包含title content author属性
  const title = blogData.title
  const content = blogData.content
  const markdown = blogData.markdown
  const author = blogData.author
  const articleImg = blogData.articleImg
  const article_id = blogData.article_id
  const createtime = Date.now()
  const articleType = blogData.type
  const articleTag = blogData.tags
  const sql = `insert into blogs (article_id, title, content, createtime, author, markdown, articleImg, articleType, articleTag) values ('${article_id}','${title}','${content}','${createtime}','${author}', "${markdown}", '${articleImg}', '${articleType}', '${articleTag}'); `
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
  const articleImg = blogData.articleImg
  const article_id = blogData.article_id
  const articleType = blogData.type
  const articleTag = blogData.tags
  const sql = `update blogs set articleType='${articleType}', articleTag='${articleTag}', title='${title}', content='${content}',markdown='${markdown}', articleImg='${articleImg}' where article_id='${article_id}' `
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
