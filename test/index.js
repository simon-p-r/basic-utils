// Load modules

var Code = require('code');
var Lab = require('lab');
var Utils = require('../lib/index.js');


// Set-up lab
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Utils', function () {

    it('should test isObj method', function (done) {

        var func = function (){};
        expect(Utils.isObj({})).to.be.true();
        expect(Utils.isObj(Object.create(null))).to.be.false();
        expect(Utils.isObj(new Date())).to.be.false();
        expect(Utils.isObj(new RegExp())).to.be.false();
        expect(Utils.isObj(undefined)).to.be.false();
        expect(Utils.isObj()).to.be.false();
        expect(Utils.isObj(null)).to.be.false();
        expect(Utils.isObj('Hello ')).to.be.false();
        expect(Utils.isObj(1234)).to.be.false();
        expect(Utils.isObj(func)).to.be.false();
        expect(Utils.isObj(Infinity)).to.be.false();
        expect(Utils.isObj(NaN)).to.be.false();
        expect(Utils.isObj(Boolean)).to.be.false();
        expect(Utils.isObj(true)).to.be.false();
        expect(Utils.isObj(new Error())).to.be.false();
        expect(Utils.isObj(Error)).to.be.false();
        expect(Utils.isObj(new EvalError())).to.be.false();
        expect(Utils.isObj(new RangeError())).to.be.false();
        expect(Utils.isObj(new ReferenceError())).to.be.false();
        expect(Utils.isObj(new SyntaxError())).to.be.false();
        expect(Utils.isObj(new TypeError())).to.be.false();
        expect(Utils.isObj(new URIError())).to.be.false();
        done();

    });

    it('should test isArray method', function (done) {

        var func = function (){};
        expect(Utils.isArray(['hello', 'world'])).to.be.true();
        expect(Utils.isArray([1, 2, 3])).to.be.true();
        expect(Utils.isArray([])).to.be.true();
        expect(Utils.isArray(new Array({ key: 'value' }, { key: 'value' }))).to.be.true();
        expect(Utils.isArray(['hello', 'world'])).to.be.true();
        expect(Utils.isArray(Object.create(new Array()))).to.be.true();
        expect(Utils.isArray(arguments)).to.be.false();
        expect(Utils.isArray(func)).to.be.false();
        expect(Utils.isArray()).to.be.false();
        expect(Utils.isArray({})).to.be.false();
        expect(Utils.isArray(' oooppp')).to.be.false();
        done();

    });

    it('should test isString method', function (done) {

        var func = function (){};
        expect(Utils.isString('hello')).to.be.true();
        expect(Utils.isString('     ')).to.be.true();
        expect(Utils.isString([])).to.be.false();
        expect(Utils.isString(new Array({ key: 'value' }, { key: 'value' }))).to.be.false();
        expect(Utils.isString(['hello', 'world'])).to.be.false();
        expect(Utils.isString(Object.create(new Array()))).to.be.false();
        expect(Utils.isString(arguments)).to.be.false();
        expect(Utils.isString()).to.be.false();
        expect(Utils.isString(func)).to.be.false();
        expect(Utils.isString({})).to.be.false();
        done();

    });

    it('should test isDate method', function (done) {

        expect(Utils.isDate(new Date())).to.be.true();
        expect(Utils.isDate(new Date('11/30/2011'))).to.be.true();
        expect(Utils.isDate('string')).to.be.false();
        expect(Utils.isDate([])).to.be.false();
        expect(Utils.isDate()).to.be.false();
        done();

    });

    it('should test isRegex method', function (done) {

        expect(Utils.isRegex(new RegExp())).to.be.true();
        expect(Utils.isRegex(/ab+c/)).to.be.true();
        expect(Utils.isRegex('string')).to.be.false();
        expect(Utils.isRegex([])).to.be.false();
        expect(Utils.isRegex()).to.be.false();
        done();

    });

    it('should test serialize method', function (done) {

        var fn = function () {};
        var toString = {
            hello: null,
            int: 123
        };
        var obj = {};
        obj.a = {
            b: obj
        };
        expect(Utils.serialize(fn)).to.be.a.string();
        expect(Utils.serialize(toString)).to.be.a.string();
        expect(Utils.serialize(obj)).to.be.an.instanceof(Error);
        done();
    });

    it('should test deserialize method', function (done) {

        var fn = function () {};
        var deserialize = Utils.serialize(fn);
        var date = Utils.serialize(new Date());
        expect(Utils.deserialize(deserialize)).to.be.a.function();
        expect(Utils.deserialize(date)).to.be.a.string();
        expect(Utils.deserialize('[1,2,3]')).to.be.an.array();
        expect(Utils.deserialize(new RegExp())).to.be.an.instanceof(Error);
        done();
    });
});
