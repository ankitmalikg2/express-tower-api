var common = require("../common/common")
var {Op} = require("sequelize")
var chai = require("chai")
var assert = chai.assert;

describe("isInt Function Tests", function(){
    it("should be true for integer string", function(){
        let output = common.isInt("123")
        assert.equal(output, true)
    })

    it("should be true for integer", function(){
        let output = common.isInt(123)
        assert.equal(output, true)
    })

    it("should be false for string", function(){
        let output = common.isInt("ank")
        assert.equal(output, false)
    })

    it("should be false for empty string", function(){
        let output = common.isInt("")
        assert.equal(output, false)
    })

    it("should be false for float string", function(){
        let output = common.isInt("12.445")
        assert.equal(output, false)
    })

    it("should be false for float value", function(){
        let output = common.isInt(12.445)
        assert.equal(output, false)
    })
})

describe("creatWhereObject Function Tests", function(){
    it("Should be true for positive test case", function(){
        var filterItem = [
            "name=ankit",
            "age>20"
        ]
        outputWhereObject ={ name: { [Op.eq]: 'ankit' }, age: { [Op.gt]: '20' } }
        var [whereObject, success] = common.creatWhereObject(filterItem)
        assert.deepEqual( whereObject, outputWhereObject )
        assert.equal(success, true)
    })

    it("Should be true for all symbols", function(){
        var filterItem = [
            "name=ankit",
            "age>20",
            "value<10",
            "tools>=20",
            "rating<=0",
            "bill!=0"
        ]

        outputWhereObject = {
            name: { [Op.eq]: 'ankit'},
            age: { [Op.gt]: '20' },
            value: { [Op.lt]: '10' },
            tools: { [Op.gte]: '20' },
            rating: { [Op.lte]: '0' },
            bill: { [Op.ne]: '0' }
          }

        var [whereObject, success] = common.creatWhereObject(filterItem)
        assert.deepEqual( whereObject, outputWhereObject )
        assert.equal(success, true)
    })

    it("Should be true when input is string not array", function(){
        var filterItem = "name=ankit"

        outputWhereObject = { name: { [Op.eq]: 'ankit'} }

        var [whereObject, success] = common.creatWhereObject(filterItem)
        assert.deepEqual( whereObject, outputWhereObject )
        assert.equal(success, true)
    })

    it("Should be false for negative test case", function(){
        var filterItem = [
            "age 20",
            "name=ankit"
        ]

        var [whereObject, success] = common.creatWhereObject(filterItem)
        assert.deepEqual( whereObject, null )
        assert.equal(success, false)
    })

    it("Should be false for empty filterItem", function(){
        var filterItem = []
        var [whereObject, success] = common.creatWhereObject(filterItem)
        assert.deepEqual( whereObject, null )
        assert.equal(success, false)
    })

    it("Should be false for null filterItem", function(){
        var filterItem = null
        var [whereObject, success] = common.creatWhereObject(filterItem)
        assert.deepEqual( whereObject, null )
        assert.equal(success, false)
    })
})

describe("createSorting Function Tests", function(){
    it("Should create sorting object", function(){
        sortObject = "age asc,name desc"
        sortOutput = common.createSorting(sortObject)

        sortExpected = [
            ["age", "asc"],
            ["name", "desc"]
        ]
        assert.deepEqual(sortOutput, sortExpected)
    })

    it("Input should have spaces in between them", function(){
        sortObject = " age asc , name desc "
        sortOutput = common.createSorting(sortObject)

        sortExpected = [
            ["age", "asc"],
            ["name", "desc"]
        ]
        assert.deepEqual(sortOutput, sortExpected)
    })

    it("when input is empty", function(){
        sortObject = ""
        sortOutput = common.createSorting(sortObject)
        sortExpected = []
        assert.deepEqual(sortOutput, sortExpected)
    })

    it("when input is null", function(){
        sortObject = null
        sortOutput = common.createSorting(sortObject)
        sortExpected = []
        assert.deepEqual(sortOutput, sortExpected)
    })
})
