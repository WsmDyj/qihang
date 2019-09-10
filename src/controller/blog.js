const { exec } = require('../db/mysql')

const getList = (author, keyworld) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = '${author}' `
  }
  if (keyworld) {
    sql += `and title like '%${keyworld}%' `
  }
  sql += `order by createtime desc;` 
  return exec(sql)
}
const getDetail = (id) => {
  const sql = `select * from blogs where id = '${id}' `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象， 包含title content author属性
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createtime = Date.now()
  const sql =  `insert into blogs (title, content, createtime, author) values ('${title}','${content}','${createtime}','${author}'); `
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id 更新博客 blogData 是一个博客对象， 包含title content
  const title = blogData.title
  const content = blogData.content
  const sql = `update blogs set title='${title}', content='${content}' where id='${id}' `
  return exec(sql).then(updataData => {
    if (updataData.affectedRows > 0) {
      return true
    } 
    return false
  })
}
const delBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author= '${author}'; `
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    } 
    return false
  })
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
