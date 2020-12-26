var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.json({ "message": "server is up and running" })
});

module.exports = router;
