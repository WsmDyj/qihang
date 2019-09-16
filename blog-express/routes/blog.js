var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.json({
    error: 0,
    data: [1, 2, 3]
  })
});

router.get('/detail', function(req, res, next) {
  res.json({
    error: 0,
    data: "ok"
  })
});


module.exports = router;
