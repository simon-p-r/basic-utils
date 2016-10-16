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

        expect(Utils.isFile(directory)).to.be.false();
        expect(Utils.isFile()).to.be.false();
        expect(Utils.isFile(file)).to.be.true();
        done();

    });

    it('should test dirExists method', (done) => {


        expect(Utils.isDir()).to.be.false();
        expect(Utils.isDir(file)).to.be.false();
        expect(Utils.isDir(directory)).to.be.true();
        done();

    });


});
