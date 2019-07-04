var express = require('express');
var router = express.Router();
var db = require('../mysql/index')

//登录接口
router.post('/login', function(req, res, next) {
  let { username, password} = req.body;
  const sql = db.connection();
  let  addSql = `SELECT * from users WHERE BINARY user_name='${username}' AND password='${password}'`;
  sql.query(addSql, function(err, result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }       
    res.status(200).send({
      success: true,
      code: 200,
      data: result
    })
  })
  db.close(sql);
});

//注册接口
router.post('/register', function(req, res, next) {
  let { username, password, mobile} = req.body;
  const sql = db.connection();
  let  addSql = 'INSERT INTO users(id,user_name,password,mobile) VALUES(0,?,?,?)';
  let  addSqlParams = [username, password, mobile];
  sql.query(addSql, addSqlParams, function(err, result){
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
    }        
    res.status(200).send({
      success: true,
      code: 200
    })
  })
  db.close(sql);
});

//退出
router.get('/logout', function(req, res, next) {
  
  res.sendStatus(200)
});

module.exports = router;
