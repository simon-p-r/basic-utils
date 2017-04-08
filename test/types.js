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

describe('Type', () => {

    it('should test isObj method', (done) => {

        Types.nonObject.forEach((type) => {

            expect(Utils.isObj(type)).to.be.false();
        });

        expect(Utils.isObj({})).to.be.true();

        expect(!Utils.isObj({})).to.be.false();
        expect(!Utils.isObj([])).to.be.true();
        done();

    });

    it('should test isNan method', (done) => {

        Types.nonNan.forEach((type) => {

            expect(Utils.isNan(type)).to.be.false();
        });

        expect(Utils.isNan(NaN)).to.be.true();
        expect(!Utils.isNan(1)).to.be.true();
        expect(!Utils.isNan(NaN)).to.be.false();
        done();

    });

    it('should test isArray method', (done) => {

        expect(Utils.isArray(['hello', 'world'])).to.be.true();
        Types.nonArray.forEach((type) => {

            expect(Utils.isArray(type)).to.be.false();
        });

        expect(!Utils.isArray({})).to.be.true();
        expect(!Utils.isArray([])).to.be.false();
        done();

    });

    it('should test isString method', (done) => {

        expect(Utils.isString('hello')).to.be.true();
        expect(Utils.isString(`test ${process.env.TMP}`)).to.be.true();
        Types.nonString.forEach((type) => {

            expect(Utils.isString(type)).to.be.false();
        });

        expect(!Utils.isString(null)).to.be.true();
        expect(!Utils.isString('string')).to.be.false();

        done();

    });

    it('should test isDate method', (done) => {

        expect(Utils.isDate(new Date())).to.be.true();
        expect(Utils.isDate(new Date('11/30/2011'))).to.be.true();
        expect(Utils.isDate('string')).to.be.false();
        expect(Utils.isDate([])).to.be.false();
        expect(Utils.isDate()).to.be.false();
        expect(!Utils.isDate([])).to.be.true();
        expect(!Utils.isDate(new Date())).to.be.false();
        done();

    });

    it('should test isRegex method', (done) => {

        expect(Utils.isRegex(new RegExp())).to.be.true();
        expect(Utils.isRegex(/ab+c/)).to.be.true();
        expect(Utils.isRegex('string')).to.be.false();
        expect(Utils.isRegex([])).to.be.false();
        expect(Utils.isRegex()).to.be.false();
        expect(!Utils.isRegex([])).to.be.true();
        expect(!Utils.isRegex(new RegExp())).to.be.false();
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

        expect(Utils.isNumber(Infinity)).to.be.false();
        expect(Utils.isNumber(NaN)).to.be.false();
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

        Types.notMac.forEach((type) => {

            expect(Utils.isMac(type)).to.be.false();
        });

        Types.mac.forEach((type) => {

            expect(Utils.isMac(type)).to.be.true();
        });


        expect(Utils.isMac()).to.be.false();
        done();

    });


    it('should test isFQDN', (done) => {

        Types.notFQDN.forEach((type) => {

            expect(Utils.isFQDN(type)).to.be.false();
        });

        Types.FQDN.forEach((type) => {

            expect(Utils.isFQDN(type)).to.be.true();
        });


        expect(Utils.isFQDN()).to.be.false();
        done();

    });

    it('should test isInt8', (done) => {

        Types.int8.forEach((m) => {

            expect(Utils.isInt8(m)).to.be.true();
        });

        Types.notInt8.forEach((m) => {

            expect(Utils.isInt8(m)).to.be.false();
        });

        done();

    });

    it('should test isUint8', (done) => {

        Types.uInt8.forEach((m) => {

            expect(Utils.isUint8(m)).to.be.true();
        });

        Types.notUint8.forEach((m) => {

            expect(Utils.isUint8(m)).to.be.false();

        });

        done();

    });

    it('should test isInt16', (done) => {

        Types.int16.forEach((m) => {

            expect(Utils.isInt16(m)).to.be.true();
        });

        Types.notInt16.forEach((m) => {

            expect(Utils.isInt16(m)).to.be.false();
        });

        done();

    });

    it('should test isUint16', (done) => {

        Types.uInt16.forEach((m) => {

            expect(Utils.isUint16(m)).to.be.true();
        });

        Types.notUint16.forEach((m) => {

            expect(Utils.isUint16(m)).to.be.false();

        });

        done();

    });

    it('should test isInt32', (done) => {

        Types.int32.forEach((m) => {

            expect(Utils.isInt32(m)).to.be.true();
        });

        Types.notInt32.forEach((m) => {

            expect(Utils.isInt32(m)).to.be.false();
        });

        done();

    });

    it('should test isUint32', (done) => {

        Types.uInt32.forEach((m) => {

            expect(Utils.isUint32(m)).to.be.true();
        });

        Types.notUint32.forEach((m) => {

            expect(Utils.isUint32(m)).to.be.false();

        });

        done();

    });

    it('should test isAscii', (done) => {

        Types.ascii.forEach((m) => {

            expect(Utils.isAscii(m)).to.be.true();
        });

        let t = '';
        for (let i = 0; i <= 127; ++i) {
            t += String.fromCharCode(i);
        }

        expect(Utils.isAscii(t)).to.be.true();

        Types.notAscii.forEach((m) => {

            expect(Utils.isAscii(m)).to.be.false();

        });

        let f = '';

        for (let i = 128; i <= 1000; ++i) {
            f += String.fromCharCode(i);
        }

        expect(Utils.isAscii(f)).to.be.false();
        done();

    });

    it('should test isDateString', (done) => {

        const date = new Date();
        expect(Utils.isDateString(date.toString())).to.be.true();
        expect(Utils.isDateString(date.toISOString())).to.be.true();
        expect(Utils.isDateString(date.toUTCString())).to.be.true();
        expect(Utils.isDateString(date.toGMTString())).to.be.true();
        expect(Utils.isDateString(date.toDateString())).to.be.true();
        expect(Utils.isDateString('Fri Nov 32 2016')).to.be.false();
        expect(Utils.isDateString(new Date('not a date string').toString())).to.be.false();
        expect(Utils.isDateString([])).to.be.false();
        done();

    });

    it('should test isRegexString', (done) => {

        const regexp = new RegExp();
        const macAddress = new RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);
        expect(Utils.isRegexString(regexp.toString())).to.be.true();
        expect(Utils.isRegexString(macAddress.toString())).to.be.true();
        expect(Utils.isRegexString('/test/g')).to.be.true();
        expect(Utils.isRegexString('/test/')).to.be.true();
        expect(Utils.isRegexString('/test/^([')).to.be.false();
        expect(Utils.isRegexString([])).to.be.false();
        expect(Utils.isRegexString('test')).to.be.false();
        expect(Utils.isRegexString(NaN)).to.be.false();
        done();

    });


    it('should test isError', (done) => {

        expect(Utils.isError(new Error())).to.be.true();
        expect(Utils.isError(new TypeError())).to.be.true();
        expect(Utils.isError(new RangeError())).to.be.true();
        expect(Utils.isError(new ReferenceError())).to.be.true();
        expect(Utils.isError(new SyntaxError())).to.be.true();
        expect(Utils.isError('error')).to.be.false();
        expect(Utils.isError(null)).to.be.false();
        expect(Utils.isError()).to.be.false();
        expect(Utils.isError([])).to.be.false();
        expect(Utils.isError({})).to.be.false();
        done();

    });


    it('should test \'or\' comparisons', (done) => {

        const value = { hello: 'world' };
        const comparison = (Utils.isObj(value) || Utils.isArray(value));
        expect(comparison).to.be.true();
        done();

    });


    it('should test \'or\' not comparisons', (done) => {

        const value = 'hello';
        const comparison = (!Utils.isObj(value) || !Utils.isArray(value));
        expect(comparison).to.be.true();
        done();

    });




});
