var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');

var userRotuer = require('./routes/user');
var dashboardRotuer = require('./routes/dashboard');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'dfsfsfrwrwere',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 60*1000
  }
}))


app.all('/api/*', function(req, res, next){
  //解决session 刷新失效的问题
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
})




app.get('/', function (req, res) {
  res.send('hello world')
  console.log(req.cookie)
  console.log(req.signedCookies)
})


app.use('/api/user',userRotuer);

app.use('/api/dashboard',dashboardRotuer);



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

