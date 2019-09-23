var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.get('/list', function(req, res, next) {
  const author = req.query.author || ''
  const keyworld = req.query.keyworld || ''
  
  // if (req.query.isadmin) {
  //   // 管理员界面
  //   const loginCheckResult = loginCheck(req)
  //   if (loginCheckResult) {
  //       // 未登录
  //       return loginCheckResult
  //   }
  //   // 强制查询自己的博客
  //   author = req.session.username
  // }

  const result = getList(author, keyworld)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

module.exports = router;
