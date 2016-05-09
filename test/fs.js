'use strict';

const Code = require('code');
const Lab = require('lab');
const Path = require('path');
const Utils = require('../lib/index.js');

// Fixtures


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('File', () => {

    const directory = process.cwd();
    const file = Path.resolve(directory, 'package.json');

    it('should expose mkDirSync method', (done) => {

        expect(Utils.mkDirSync).to.be.a.function();
        done();

    });


    it('should expose mkDir method', (done) => {

        expect(Utils.mkDir).to.be.a.function();
        done();
    });


    it('should expose rmDirSync method', (done) => {

        expect(Utils.rmDirSync).to.be.a.function();
        done();
    });


    it('should expose rmDir method', (done) => {

        expect(Utils.rmDir).to.be.a.function();
        done();
    });

    it('should test fileExists method', (done) => {

        expect(Utils.fileExists(directory)).to.be.false();
        expect(Utils.fileExists()).to.be.false();
        expect(Utils.fileExists(file)).to.be.true();
        done();

    });

    it('should test dirExists method', (done) => {


        expect(Utils.dirExists()).to.be.false();
        expect(Utils.dirExists(file)).to.be.false();
        expect(Utils.dirExists(directory)).to.be.true();
        done();

    });


});
