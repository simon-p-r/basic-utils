'use strict';

const Code = require('code');
const Lab = require('lab');
const Utils = require('../lib/index.js');

// Fixtures
const Types = require('./fixtures/types.js');

// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Utils', () => {

    it('should test isObj method', (done) => {

        Types.nonObject.forEach((type) => {

            expect(Utils.isObj(type)).to.be.false();
        });

        expect(Utils.isObj({})).to.be.true();

        done();

    });

    it('should test isArray method', (done) => {

        expect(Utils.isArray(['hello', 'world'])).to.be.true();
        Types.nonArray.forEach((type) => {

            expect(Utils.isArray(type)).to.be.false();
        });

        done();

    });

    it('should test isString method', (done) => {

        expect(Utils.isString('hello')).to.be.true();
        expect(Utils.isString(`test ${process.env.TMP}`)).to.be.true();
        Types.nonString.forEach((type) => {

            expect(Utils.isString(type)).to.be.false();
        });

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

    it('should test isNumber method', (done) => {

        expect(Utils.isNumber(1234)).to.be.true();
        expect(Utils.isNumber(12.00)).to.be.true();
        Types.nonInt.forEach((type) => {

            expect(Utils.isNumber(type)).to.be.false();
        });
        done();

    });

    it('should test isUndefined method', (done) => {

        const nill = (hello) => {

            return;
        };

        let undef;

        Types.nonUndef.forEach((type) => {

            expect(Utils.isUndefined(type)).to.be.false();
        });

        expect(Utils.isUndefined(undef)).to.be.true();
        expect(Utils.isUndefined(nill())).to.be.true();
        expect(Utils.isUndefined()).to.be.true();
        done();

    });

    it('should test isNull method', (done) => {

        const nill = (hello) => {

            return;
        };
        const func = (hello) => {

            return hello;
        };
        const undef = undefined;
        const def = 'notNull';
        expect(Utils.isNull(null)).to.be.true();
        expect(Utils.isNull()).to.be.false();
        expect(Utils.isNull(undef)).to.be.false();
        expect(Utils.isNull(nill())).to.be.false();
        expect(!Utils.isNull(def)).to.be.true();
        expect(Utils.isNull(NaN)).to.be.false();
        expect(Utils.isNull('1234')).to.be.false();
        expect(Utils.isNull(func)).to.be.false();
        expect(Utils.isNull(/ab+c/)).to.be.false();
        expect(Utils.isNull('string')).to.be.false();
        expect(Utils.isNull([])).to.be.false();
        done();

    });

    it('should test isEmpty method', (done) => {

        const nill = (hello) => {

            return;
        };
        const func = (hello) => {

            return hello;
        };
        const undef = undefined;
        const def = 'notNull';
        expect(Utils.isEmpty(null)).to.be.true();
        expect(Utils.isEmpty()).to.be.true();
        expect(Utils.isEmpty(undef)).to.be.true();
        expect(Utils.isEmpty(nill())).to.be.true();
        expect(!Utils.isEmpty(def)).to.be.true();
        expect(Utils.isEmpty(NaN)).to.be.false();
        expect(Utils.isEmpty('1234')).to.be.false();
        expect(Utils.isEmpty(func)).to.be.false();
        expect(Utils.isEmpty(/ab+c/)).to.be.false();
        expect(Utils.isEmpty('string')).to.be.false();
        expect(Utils.isEmpty([])).to.be.false();
        done();

    });

    it('should test isObjectID method', (done) => {

        expect(Utils.isObjectID('534b4dcaadc0c2136938de3a')).to.be.true();
        Types.nonUndef.forEach((type) => {

            expect(Utils.isObjectID(type)).to.be.false();
        });

        Types.nonObject.forEach((type) => {

            expect(Utils.isObjectID(type)).to.be.false();
        });
        done();

    });

    it('should test isIP', (done) => {

        Types.v4.forEach((type) => {

            expect(Utils.isIp(type)).to.be.true();
            expect(Utils.isIp4(type)).to.be.true();
        });

        Types.v4not.forEach((type) => {

            expect(Utils.isIp(type)).to.be.false();
            expect(Utils.isIp4(type)).to.be.false();
        });

        Types.v6.forEach((type) => {

            expect(Utils.isIp(type)).to.be.true();
            expect(Utils.isIp6(type)).to.be.true();
        });

        Types.v6not.forEach((type) => {

            expect(Utils.isIp(type)).to.be.false();
            expect(Utils.isIp6(type)).to.be.false();
        });

        expect(Utils.isIp()).to.be.false();
        expect(Utils.isIp4()).to.be.false();
        expect(Utils.isIp6()).to.be.false();
        done();

    });

    it('should test isMac', (done) => {

        Types.mac.forEach((m) => {

            expect(Utils.isMac(m)).to.be.true();
        });

        Types.notMac.forEach((m) => {

            expect(Utils.isMac(m)).to.be.false();
        });

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
