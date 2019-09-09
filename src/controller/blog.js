const getList = (author, keyworld) => {
  // 先返回假数据,（格式需要正确）
  return [
    { id: 1, title: '标题', content: '内容', createTime: 1568010873884, author: 'zhangsan' },
    { id: 2, title: '标题', content: '内容', createTime: 1568010947165, author: 'lisi' }
  ]
}

module.exports = {
  getList
}
