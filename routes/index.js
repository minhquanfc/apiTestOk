var express = require('express');
var router = express.Router();
const apiC = require('../controllers/api.controller');
/* GET home page. */
router.get('/check', apiC.formCheck);
router.post('/check', apiC.callApi);
router.post('/api/remains', apiC.postApi);

module.exports = router;
