var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('login hh')
});

router.get('/out', function(req, res, next) {
  res.end('login/out')
});

module.exports = router;
