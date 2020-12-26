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
    var symbolMap = {
        ">=": Op.gte,
        "<=": Op.lte,
        "!=": Op.ne,
        "=": Op.eq,
        ">": Op.gt,
        "<": Op.lt
    }

    filterItem.forEach(function (item) {
        var arr = item.trim().split(/[=><!]+/)
        if (arr.length != 2) {
            return [null, false]
        }

        for (key in symbolMap) {
            console.log("key: ", key)
            if (item.indexOf(key) !== -1) {
                value = symbolMap[key]
                whereObject[arr[0]] = { [value]: arr[1] }
                break;
            }
        }
    })
    return [whereObject, true];
}

function createSorting(sort) {
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
