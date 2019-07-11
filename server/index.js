var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var RedisStore = require('connect-redis')(session);
var logger = require('morgan');

var userRotuer = require('./routes/user');
var dashboardRotuer = require('./routes/dashboard');
var notesRotuer = require('./routes/notes');
require('./utils/easyBook')  //从简书拉取数据

var app = express();

const redisoOptions = {
  host: 'localhost', 
  port: 6379
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new RedisStore(redisoOptions),
  secret: 'xSqdR4yzyhESjwhqThQvTglrFimm1OtFKLOl05JZO1FQpZEuLsO79TsKCGVobMCh5Ul3eQM8Xfg2eI5VYsQA7tJovwxF0CUUFRaaqpUXU6hPQQFHeyUwHBhNGzPD2L1D',  //128位随机字符串
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 24*60*60*1000
  }
}))


app.all('/api/*', function(req, res, next){
  //解决session 刷新失效的问题
  // res.header("Access-Control-Allow-Origin", req.headers.origin)
  // res.header('Access-Control-Allow-Credentials', 'true')
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
})




app.get('/', function (req, res) {
  res.send('hello world')
  console.log(req.cookie)
  console.log(req.signedCookies)
})


app.use('/api/user',userRotuer);

app.use('/api/dashboard',dashboardRotuer);
app.use('/api/notes',notesRotuer);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//生产环境

if(process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}



app.listen(5000,function(){
  console.log('listening on port 5000!')
})

