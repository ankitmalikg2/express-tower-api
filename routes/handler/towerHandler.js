const common = require("../../common/common")
const db = require("../../database/db");
const { Op } = require("sequelize")
var socketApi = require("../../socketApi");
const redisClient = require("../../database/redis");

async function listTowers(req, res, next) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    var sort = req.query.sort;
    var filter = req.query.filter;
    var showOffices = req.query["show-with-offices"]

    queryFilterObject = {}

    if (offset != undefined && offset != "" && common.isInt(offset)) {
        queryFilterObject["offset"] = offset;
    }

    if (limit != undefined && limit != "" && common.isInt(limit)) {
        queryFilterObject["limit"] = limit;
    } else {
        queryFilterObject["limit"] = 100;
    }

    if (sort != undefined && sort != "") {
        queryFilterObject["order"] = common.createSorting(sort);
    }

    if (filter != undefined && filter != "") {
        var [whereObject, success] = common.creatWhereObject(filter)
        console.log(whereObject, success)
        if (!success) {
            res.status(400).json({
                "status": 400,
                "data": "Bad Input"
            })
        }
        if (showOffices == "true") {
            whereObject["officeCount"] = { [Op.gt]: 0 }
        }
        queryFilterObject["where"] = whereObject
    }

    console.log("queryFilterObject: ",queryFilterObject)

    queryFilterKey = JSON.stringify(queryFilterObject)
    try {
        //getting data from cache
        var output = await redisClient.get(queryFilterKey)
        if (output != null) {
            console.log("Data from cache",queryFilterKey, output)
            res.status(200).json({
                "status": 200,
                "data": JSON.parse(output)
            })
        } else {
            db.towers.findAll(queryFilterObject)
                .then(async function(tower) {
                    //setting cache
                    await redisClient.set(queryFilterKey, JSON.stringify(tower))
                    await redisClient.expire(queryFilterKey, 60*5)

                    //setting output
                    res.status(200).json({
                        "status": 200,
                        "data": tower
                    })
                })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            "status": 500,
            "data": []
        })
    }
}

function getTower(req, res, next) {
    var id = req.params.id;
    db.towers.findOne({ where: { id: id } })
        .then((tower) => {
            res.status(200).json({
                "status": 200,
                "data": tower
            })
        }).catch(function (err) {
            res.status(500).json({
                "status": 500,
                "data": []
            })
        })
}

function createTower(req, res, next) {

    db.towers.create(req.body)
        .then((tower) => {
            res.status(201).json({
                "status": 201,
                "data": tower
            })
            socketApi.sendNotification({
                action: "new_tower_created",
                data: tower
            })
        }).catch(function (err) {
            res.status(500).json({
                "status": 500,
                "data": {}
            })
        })
}

function updateTower(req, res, next) {
    const id = req.params.id;
    const updates = req.body;

    db.towers
        .update(updates, { where: { id: id } })
        .then(function (count) {
            res.status(200).json({
                "status": 200,
                "count": count
            })

            updates["id"] = id
            socketApi.sendNotification({
                action: "tower_updated",
                data: updates
            })

        }).catch(function (err) {
            res.status(500).json({
                "status": 500,
                "data": {}
            })
        })
}

function deleteTower(req, res, next) {
    const id = req.params.id;

    db.towers.destroy({
        where: { id: id }
    }).then(function (deletedTower) {
        res.status(200).json({
            "status": 200,
            "count": deletedTower
        })
        socketApi.sendNotification({
            action: "tower_deleted",
            data: { id: id }
        })
    }).catch(function (err) {
        res.status(500).json({
            "status": 500,
            "data": {}
        })
    })
}

module.exports = {
    listTowers: listTowers,
    getTower: getTower,
    createTower: createTower,
    updateTower: updateTower,
    deleteTower: deleteTower
}
