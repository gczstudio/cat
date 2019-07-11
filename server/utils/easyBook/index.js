var https = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var db = require('../../mysql/index')

var i = 0;
var url = "https://www.jianshu.com/"

startRequest(url,function($){
    requestConent($)
})

function startRequest(url, callback){

    https.get(url,function(res){
        var html = '';
        res.setEncoding('utf-8')
        res.on('data', function(data){
            html += data;
        })
        
        res.on('end', function(){
            var $ = cheerio.load(html);
            callback($)
        })
    })

}

function requestConent($){
    const sql = db.connection();
    $('#list-container .note-list li').each((i,ele)=>{
        var el = $(ele);
        var title = el.find('.title').text(),
            detail_url = url + el.find('.wrap-img').attr('href'),
            img_url = el.find('.wrap-img img').attr('src') || '',
            abstract = el.find('.abstract').text(),
            js_meta = el.find('.jsd-meta').text(),
            nick_name = el.find('.nickname').text(),
            comments = el.find('.ic-list-comments').parent().text(), 
            likes = el.find('.ic-list-like').parent().text();
            console.log(title, detail_url, img_url, abstract, js_meta, nick_name, comments, likes)
        //插入数据库
        
        let  addSql = `INSERT INTO notes(title, detail_url, img_url, abstract, js_meta, nick_name, comments, likes) VALUES(?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE title=title`;
        let  addSqlParams = [title, detail_url, img_url, abstract, js_meta, nick_name, comments, likes];
        sql.query(addSql, addSqlParams, function(err, result){
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            console.log(result,'zhixinx')
        })

        //保存图片到本地
        // savedImg(img_url)
    })
    db.close(sql);
        
}

function sendConent(url){
    
}

function savedImg($){
    
}