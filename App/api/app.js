
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var book = require('./routes/book');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var auth = require('./routes/auth');
const cors = require("cors");

mongoose.connect('mongodb://localhost:27017:/adminportaldb', {
    useNewUrlParser: true,
    promiseLibrary: require('bluebird')
})
    .then(() => console.log("connection is successful"))
    .catch((err) => console.error(err));


app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static('public'));


app.use("/book", book);
app.use("/auth", auth);

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})


app.use(function(req,res,next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') = 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
})

module.exports = app;