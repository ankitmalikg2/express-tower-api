var express = require('express');
var router = express.Router();
const common = require("../common/common")
const db = require("../database/db");
const {Op} = require("sequelize")


/* GET list towers */
router.get("/list", function (req, res, next) {
    console.log(req.query)
    var offset = req.query.offset;
    var limit = req.query.limit;
    var sort = req.query.sort;
    var filter = req.query.filter;
    console.log("filter-output: ",filter)

    queryFilterObject = {}

    if( offset != undefined && offset != "" && common.isInt(offset) ){
        queryFilterObject["offset"] = offset;
    }

    if( limit != undefined && limit != "" && common.isInt(limit) ){
        queryFilterObject["limit"] = limit;
    }

    if(sort != undefined && sort != ""){
        queryFilterObject["order"] = common.createSorting(sort);
    }

    if(filter != undefined && filter!=""){
        var [whereObject, success] = common.creatWhereObject(filter)
        console.log(whereObject, success)
        if( !success ){
            res.status(400).json({
                "status": 400,
                "data": "Bad Input"
            })
        }
        queryFilterObject["where"] = whereObject
    }

    console.log(queryFilterObject)
    db.towers.findAll(queryFilterObject)
    .then((tower) => {
        res.status(200).json({
            "status": 200,
            "data": tower
        })
    }).catch(function (err) {
        console.log(err)
        res.status(500).json({
            "status": 500,
            "data": []
        })
    })
})

/* GET tower listing */
router.get('/:id', function (req, res, next) {
    console.log(req.headers)
    var id = req.params.id;
    db.towers.findOne({where: {id: id}})
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
    //   res.send('respond with a resource: '+ process.env.NAME );
});

/* POST tower creation */
router.post("/", function (req, res, next) {

    db.towers.create(req.body).then((tower)=>{
        res.status(200).json({
            "status":200,
            "data": tower
        }).catch(function (err) {
            res.status(500).json({
                "status": 500,
                "data": {}
            })
        })
    })

})

/* PUT tower update */
router.put("/:id", function (req, res, next) {
    const id = req.params.id;
    const updates = req.body;

    db.towers
    .update(updates, {where:{ id : id}})
    .then(function(count){
        res.status(200).json({
            "status":200,
            "count": count
        })
    }).catch(function (err) {
        res.status(500).json({
            "status": 500,
            "data": {}
        })
    })
})

/* POSt tower creation */
router.delete("/:id", function (req, res, next) {
    const id = req.params.id;

    db.towers.destroy({
        where: { id: id}
    }).then(function(deletedTower){
        res.status(200).json({
            "status":200,
            "count": deletedTower
        })
    }).catch(function (err) {
        res.status(500).json({
            "status": 500,
            "data": {}
        })
    })
})

module.exports = router;
