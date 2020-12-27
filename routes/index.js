var express = require('express');
var router = express.Router();
var authHandler = require("./handler/authHandler")

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.json({ "message": "server is up and running" })
});

router.get('/socket', async function (req, res, next) {
    res.render("index2")
  });

/* POST Getting Authentication */
router.post("/getAuth", authHandler.getAuthToken)

module.exports = router;
