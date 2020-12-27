const { Op } = require("sequelize");

function isInt(value) {
    if (value == parseInt(value, 10)){
        return true;
    }else{
        return false;
    }
}

function creatWhereObject(filterItem) {
    var whereObject = {}
    var success = true
    var symbolMap = {
        ">=": Op.gte,
        "<=": Op.lte,
        "!=": Op.ne,
        "=": Op.eq,
        ">": Op.gt,
        "<": Op.lt
    }

    if( filterItem == null || filterItem == undefined || filterItem.length < 1 ){
        return [null, false]
    }

    if(!(filterItem instanceof Array)){
        filterItem = filterItem.split(",")
    }

    filterItem.forEach(function (item) {
        var arr = item.trim().split(/[=><!]+/)
        if (arr.length != 2) {
            success= false
            return;
        }

        for (key in symbolMap) {
            if (item.indexOf(key) !== -1) {
                value = symbolMap[key]
                whereObject[arr[0]] = { [value]: arr[1] }
                break;
            }
        }
    })

    return (success)? [whereObject, true] : [null, false];
}

function createSorting(sort) {
    if(sort == undefined || sort == null || sort == ""){
        return []
    }
    firstArray = sort.split(",")
    sortArray = []
    firstArray.forEach(function (item) {
        sortArray.push(item.trim().split(" "))
    })
    return sortArray
}


module.exports = {
    isInt: isInt,
    creatWhereObject: creatWhereObject,
    createSorting: createSorting
}
