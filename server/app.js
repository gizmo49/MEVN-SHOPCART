var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const seeder = require('./routes/seeder/product');
const products = require('./routes/product');
const categories = require('./routes/category');


var app = express();
/*
MOONGOOSE CONNECTION
*/
mongoose.connect('mongodb://node-shop:node-shop@cluster0-shard-00-00-vdcp8.mongodb.net:27017,cluster0-shard-00-01-vdcp8.mongodb.net:27017,cluster0-shard-00-02-vdcp8.mongodb.net:27017/cart?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true' +
	{
		useMongoClient: true
  });
  
  mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
   
  });
  
  mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
  });




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*SEEDERS rOUTING */

app.use('/seeder', seeder);
app.use('/products', products);
app.use('/categories', categories);


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

module.exports = app;
