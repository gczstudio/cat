var express = require('express');
var router = express.Router();
var db = require('../mysql/index')
var async = require('async')
var svgCaptcha = require('svg-captcha');
var CryptoJS = require("crypto-js");
var sha1 = require("crypto-js/sha1");
//登录接口
router.post('/login', function(req, res, next) {
  let { username, password, captcha} = req.body;
  if(captcha&&(captcha !== req.session.randomcode)){
    res.status(200).send({
      success: true,
      msg: '验证码错误！'
    })
    return;
  }
  var bytes  = CryptoJS.AES.decrypt(password, '1234567890');
  password = sha1(bytes.toString(CryptoJS.enc.Utf8)).toString();
  console.log(password,2222)
  const sql = db.connection();
  let  addSql = `SELECT * from users WHERE BINARY user_name='${username}' AND password='${password}'`;
  sql.query(addSql, function(err, result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    req.session.user = req.body;
    console.log(result,111111)
    if(result.length){
      
      // res.cookie('name','tobi')
      res.status(200).send({
        success: true,
        data: result[0]
      })
    }else{
      res.status(200).send({
        success: true,
        msg: '用户名或密码错误！'
      })
    }       
  })
  db.close(sql);
});

//注册接口
router.post('/register', function(req, res, next) {
  let { username, password, mobile} = req.body;
  var bytes  = CryptoJS.AES.decrypt(password, '1234567890');
  password = sha1(bytes.toString(CryptoJS.enc.Utf8)).toString(); //先解密然后sha1加密存到数据库
  console.log(password)
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
          success: true,
          data: {
            username
          }
        })
      })
    }
  ],function(err, result){
    db.close(sql);
  })
  
});




//退出
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.clearCookie();
  res.status(200).send({
    success: true
  })
});


//获取验证码
router.get('/captcha', function(req, res, next) {
    var option ={
      size: 4,  //验证码长度
      width: 120,
      height: 36,
      background: "#f4f3f2",//干扰线条数
      noise: 2,
      fontSize: 50,
      ignoreChars: '0o1i',   //验证码字符中排除'0o1i'
      color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有    
    }
    // 验证码，有两个属性，text是字符，data是svg代码
    var code = svgCaptcha.create(option);
    // 保存到session,忽略大小写
    req.session["randomcode"] = code.text.toLowerCase();
    // 返回数据直接放入页面元素展示即可
    res.send({
        success: true,
        data: code.data
    });
});

module.exports = router;
