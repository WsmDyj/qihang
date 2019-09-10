const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method // GET POST
  const id = req.query.id 
  // 获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyworld = req.query.keyworld || ''
    const result = getList(author, keyworld)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }
  // 获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }
  // 新建一篇博客
  if(method === 'POST' && req.path === '/api/blog/new') {
    req.body.author = 'zhangsan' // 假数据， 待开发登录时在改为真数据
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }
  // 更新一篇博客
  if(method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }
  // 删除一篇博客
  if(method === 'POST' && req.path === '/api/blog/del') {
    const author = 'zhangsan' // 假数据， 待开发登录时在改为真数据
    const result = delBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter