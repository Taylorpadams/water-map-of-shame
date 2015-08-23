var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile('index.html');
});


router.post('/testreport', function(req, res) {
    console.log(req);
});



module.exports = router;
