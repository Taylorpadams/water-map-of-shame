var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile('index.html');
});


router.post('/publish/:id', function(req, res) {
  var featureIdToPublish = req.param("id");
  res.sendStatus(200);
});

router.post('/unpublish/:id', function(req, res) {
    var featureIdToUnPublish = req.param("id");
  res.sendFile('index.html');
});

module.exports = router;
