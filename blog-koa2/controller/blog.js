const { exec } = require('../db/mysql')

const getList = async (author, keyworld) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = '${author}' `
  }
  if (keyworld) {
    sql += `and title like '%${keyworld}%' ` 
  }
  sql += `order by createtime desc;` 
  return await exec(sql)
}
const getDetail = async (id) => {
  const sqlArticle = `select * from blogs where article_id = '${id}' `
  const articles = await exec(sqlArticle)
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
  const sql =  `insert into blogs (article_id, title, content, createtime, author, markdown, articleImg) values ('${article_id}','${title}','${content}','${createtime}','${author}', '${markdown}', '${articleImg}'); `
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
  const sql = `update blogs set title='${title}', content='${content}',markdown='${markdown}',articleImg='${articleImg}' where article_id='${article_id}' `
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
  delBlog
}
