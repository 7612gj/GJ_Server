var express = require('express');
var router = express.Router();
const Logger = require('../modules/Logger');
const logger = new Logger('Index');

router.get('/', function(req, res, next) {
  res.render('Index');
  logger.info({client:req});
});

module.exports = router;
