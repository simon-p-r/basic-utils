'use strict';

const Code = require('code');
const Lab = require('lab');

// Fixtures

const Utils = require('../lib/index.js');


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Object', () => {


    it('should expose a deepFreeze method', (done) => {

        expect(Utils.deepFreeze).to.be.a.function();
        done();

    });

    it('should test iterateObj method', (done) => {

        const test = {
            a: 'value',
            b: 1,
            c: {},
            d: 'anotherValue'
        };

        expect(Utils.iterateObj(test)).to.be.a.string().and.equal('a~value\nd~anotherValue\n');
        done();

    });


    it('should test format method', (done) => {

        const expected = 'This is the first entry and this is the second entry';
        expect(Utils.format('{0} is the first entry and this is the {1} entry', 'This', 'second')).to.equal(expected);
        done();

    });

    it('should test serialize method', (done) => {

        const fn = function () {};
        const toString = {
            hello: null,
            int: 123
        };
        const circular = {};
        circular.a = {
            b: circular
        };

        const obj = {
            date: new Date(),
            regexp: new RegExp(),
            nan: NaN,
            positive: Infinity,
            negative: -Infinity,
            key: 'value'
        };

        const string = Utils.serialize(obj);
        const parsed = Utils.deserialize(string);
        expect(string).to.be.a.string();
        expect(parsed).to.be.an.object();
        expect(parsed.date).to.be.a.date();
        expect(parsed.regexp).to.be.a.regexp();
        expect(parsed.nan).to.equal(NaN);
        expect(parsed.positive).to.equal(Infinity);
        expect(parsed.negative).to.equal(-Infinity);
        expect(Utils.serialize(fn)).to.be.a.string();
        expect(Utils.serialize(toString)).to.be.a.string();
        expect(Utils.serialize(circular)).to.be.an.instanceof(Error);
        done();
    });

    it('should test deserialize method', (done) => {

        const fn = function () {};
        const deserialize = Utils.serialize(fn);
        const date = Utils.serialize(new Date());
        expect(Utils.deserialize(deserialize)).to.be.a.function();
        expect(Utils.deserialize(date)).to.be.a.date();
        expect(Utils.deserialize('[1,2,3]')).to.be.an.array();
        expect(Utils.deserialize(new RegExp())).to.be.an.instanceof(Error);
        done();
    });


});
