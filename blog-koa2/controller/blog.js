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
  const sql = `select * from blogs where id = '${id}' `
  const rows = await exec(sql)
  return rows[0]
}
const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象， 包含title content author属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()
  const sql =  `insert into blogs (title, content, createtime, author) values ('${title}','${content}','${createtime}','${author}'); `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
  
}
const updateBlog = async (id, blogData = {}) => {
  // id 更新博客 blogData 是一个博客对象， 包含title content
  const title = blogData.title
  const content = blogData.content
  const sql = `update blogs set title='${title}', content='${content}' where id='${id}' `
  const updataData = await exec(sql)
  if (updataData.affectedRows > 0) {
    return true
  } 
  return false
}
const delBlog = async (id, author) => {
  const sql = `delete from blogs where id='${id}' and author= '${author}'; `
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
