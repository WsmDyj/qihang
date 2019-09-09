const getList = (author, keyworld) => {
  // 先返回假数据,（格式需要正确）
  return [
    { id: 1, title: '标题', content: '内容', createTime: 1568010873884, author: 'zhangsan' },
    { id: 2, title: '标题', content: '内容', createTime: 1568010947165, author: 'lisi' }
  ]
}
const getDetail = (id) => {
  return [
    { id: 1, title: '标题', content: '内容', createTime: 1568010873884, author: 'zhangsan' },
  ]
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象， 包含title content
  return {
    id: 3
  }
}
const updateBlog = (id, blogData = {}) => {
  // id 更新博客 blogData 是一个博客对象， 包含title content
  return true
}
const delBlog = (id) => {
  return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
