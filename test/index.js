'use strict';

const Code = require('code');
const Lab = require('lab');
const Utils = require('../lib/index.js');


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Utils', () => {

    it('should test isObj method', (done) => {

        const func = function (){};
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

    it('should test isArray method', (done) => {

        const func = function (){};
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

    it('should test isString method', (done) => {

        const func = function (){};
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

    it('should test isDate method', (done) => {

        expect(Utils.isDate(new Date())).to.be.true();
        expect(Utils.isDate(new Date('11/30/2011'))).to.be.true();
        expect(Utils.isDate('string')).to.be.false();
        expect(Utils.isDate([])).to.be.false();
        expect(Utils.isDate()).to.be.false();
        done();

    });

    it('should test isRegex method', (done) => {

        expect(Utils.isRegex(new RegExp())).to.be.true();
        expect(Utils.isRegex(/ab+c/)).to.be.true();
        expect(Utils.isRegex('string')).to.be.false();
        expect(Utils.isRegex([])).to.be.false();
        expect(Utils.isRegex()).to.be.false();
        done();

    });

    it('should test isFunction method', (done) => {

        const func = (hello) => {

            return hello;
        };
        const any = function (hello) {

            return hello;
        };
        expect(Utils.isFunction(func)).to.be.true();
        expect(Utils.isFunction(any)).to.be.true();
        expect(Utils.isFunction(/ab+c/)).to.be.false();
        expect(Utils.isFunction('string')).to.be.false();
        expect(Utils.isFunction([])).to.be.false();
        expect(Utils.isFunction()).to.be.false();
        done();

    });

    it('should test isObjectID method', (done) => {

        expect(Utils.isObjectID('534b4dcaadc0c2136938de3a')).to.be.true();
        expect(Utils.isObjectID(/ab+c/)).to.be.false();
        expect(Utils.isObjectID('string')).to.be.false();
        expect(Utils.isObjectID([])).to.be.false();
        expect(Utils.isObjectID()).to.be.false();
        expect(Utils.isObjectID({})).to.be.false();
        done();

    });

    it('should test serialize method', (done) => {

        const fn = function () {};
        const toString = {
            hello: null,
            int: 123
        };
        const obj = {};
        obj.a = {
            b: obj
        };
        expect(Utils.serialize(fn)).to.be.a.string();
        expect(Utils.serialize(toString)).to.be.a.string();
        expect(Utils.serialize(obj)).to.be.an.instanceof(Error);
        done();
    });

    it('should test deserialize method', (done) => {

        const fn = function () {};
        const deserialize = Utils.serialize(fn);
        const date = Utils.serialize(new Date());
        expect(Utils.deserialize(deserialize)).to.be.a.function();
        expect(Utils.deserialize(date)).to.be.a.string();
        expect(Utils.deserialize('[1,2,3]')).to.be.an.array();
        expect(Utils.deserialize(new RegExp())).to.be.an.instanceof(Error);
        done();
    });
});
