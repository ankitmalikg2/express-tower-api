var express = require('express');
var router = express.Router();
var towerHandler = require("./handler/towerHandler")
var authHandler = require("./handler/authHandler")


/* GET list towers */
router.get("/list", towerHandler.listTowers)

/* GET tower listing */
router.get('/:id', towerHandler.getTower);

/* POST tower creation */
router.post("/", authHandler.verifyAuthToken, towerHandler.createTower)

/* PUT tower update */
router.put("/:id", authHandler.verifyAuthToken, towerHandler.updateTower)

/* POSt tower creation */
router.delete("/:id", authHandler.verifyAuthToken, towerHandler.deleteTower)

module.exports = router;
