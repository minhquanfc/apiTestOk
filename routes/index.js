var express = require('express');
var router = express.Router();
const apiC = require('../controllers/api.controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/api/remains', apiC.postApi);

module.exports = router;
