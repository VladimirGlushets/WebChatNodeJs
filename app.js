var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

var index = require('./routes/index');
var articles = require('./routes/articles');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals')); //layout partial block
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'ejs');

// // Middleware
// app.use(function(req, res, next) {
//     if (req.url == '/') {
//         res.end("Hello");
//     } else {
//         next();
//     }
// });
//
// app.use(function(req, res, next) {
//     if (req.url == '/test') {
//         res.end("Test");
//     } else {
//         next();
//     }
// });
//
// app.use(function(req, res, next) {
//     if (req.url == '/forbidden') {
//
//         // если у next есть аргументы, то управление автоматически передается обработчику ошибок.
//         // если у middleware 4 принимающих аргумента, то это и будет кастомный обработчик ошибок.
//         // если такого нет - передается стандартному обработчику
//         next(new Error("wops denied"));
//     } else {
//         next();
//     }
// });
//
// // Error handler
// app.use(function(err, req, res, next) {
//     // NODE_ENV = 'development' если переменная не указана,
//     // а если указана, то app.get('env') становится равна значению переменной NODE_ENV
//     if (app.get('env') == 'development') {
//       res.send(401, "Some Error Handler");
//         //app.use(errorhandler());
//     } else {
//         res.send(500);
//     }
// });


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
