/**
* @author GJL
* @since 2017.12.01
**/

// require
const express = require('express');
const app = express();
const index = require('./routes/index');
const login = require('./routes/Login');
const Logger = require('./modules/Logger');
const logger = new Logger('Server');

// application setting
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/static', express.static('public', {index:false}));
// app.use(express.urlencoded({extended:true}));

// middleware
app.use(function(req, res, next){
  logger.info({client:req});
  next();
});

// routing
app.use('/', index);
app.use('/login', login);

// application listen
app.listen(3003, function(){
  console.log('\nGJ_Server\nConnected 3003 port');
});
