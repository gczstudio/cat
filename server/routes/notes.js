var express = require('express');
var router = express.Router();
var db = require('../mysql/index')
var async = require('async')

router.post('/getNotes',function(req, res){
  let { pageSize, pageNum} = req.body;
  const sql = db.connection();
  async.series([
    function(cb){
      sql.query('SELECT COUNT(*) FROM notes', function(err, result){
        if(err){
          console.log('[COUNT ERROR] - ',err.message);
        return;
        }
        cb(null,result)
      })
    },
    function(cb){
      let  selectSql = `SELECT * FROM notes limit ${pageSize*(pageNum-1)},${pageSize}`;
      sql.query(selectSql, function(err, result){
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        cb(null,result)
      })
    }
  ], function(err, result){
    res.status(200).send({
      success: true,
      data: result[1],
      pageNum,
      pageSize,
      total: result[0][0]['COUNT(*)']
    })

    db.close(sql);
  })
})

module.exports = router;