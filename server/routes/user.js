var express = require('express');
var router = express.Router();
var db = require('../mysql/index')
var async = require('async')

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
    req.session.user = req.body;
    console.log(req.session,111111)
    if(result.length){
      
      // res.cookie('name','tobi')
      res.status(200).send({
        success: true,
        data: result[0]
      })
    }else{
      res.status(200).send({
        success: false,
        msg: '用户名或密码错误！'
      })
    }       
  })
  db.close(sql);
});

//注册接口
router.post('/register', function(req, res, next) {
  let { username, password, mobile} = req.body;
  const sql = db.connection();
  let  addSql = 'INSERT INTO users(id,user_name,password,mobile) VALUES(0,?,?,?)';
  let  addSqlParams = [username, password, mobile];

  async.series([
    function(cb){
      sql.query(`SELECT * from users WHERE BINARY user_name='${username}'`, function(err, result){
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        if(result.length){
          res.status(200).send({
            success: false,
            msg: '该用户已存在！'
          })
        }else{
          cb(null, result)
        }
      })  
    },
    function(cb){
      sql.query(addSql, addSqlParams, function(err, result){
        if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
        }        
        cb(null, result)
        res.status(200).send({
          success: true
        })
      })
    }
  ])
  

  
  // db.close(sql);
});




//退出
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.clearCookie();
  res.status(200).send({
    success: true
  })
});

module.exports = router;
