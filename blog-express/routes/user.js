var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  const { username, passworld } = req.body
  res.json({
    error: 0,
    data: {
      username,
      passworld
    }
  })
});


module.exports = router;
