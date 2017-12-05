var express = require('express');
var router = express.Router();
const Logger = require('../modules/Logger');
const logger = new Logger('Login');

router.get('/', function(req, res, next) {
  res.render('Login');
  logger.info({client:req});
});

module.exports = router;
