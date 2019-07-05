var express = require('express');
var router = express.Router();
var db = require('../mysql/index')
var async = require('async')

//获取用户信息
router.post('/userInfo', function(req, res, next) {
    if(req.session&&req.session.user){
        let { username } = req.body;
        const sql = db.connection();
        let  addSql = `SELECT * from users WHERE BINARY user_name='${username}'`;
        sql.query(addSql, function(err, result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.status(200).send({
            success: true,
            data: result[0]
        })
        })
        db.close(sql);
    }else{
        res.status(200).send({
            success: false,
            msg: 'session失效！'
        })
    }
    
    
  });

  module.exports = router;