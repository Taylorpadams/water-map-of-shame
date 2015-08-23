var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile('index.html');
});


router.post('/public', function(req, res) {
      res.sendFile('publicMap.html');
});



module.exports = router;
