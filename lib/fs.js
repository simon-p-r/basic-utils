'use strict';

const Fs = require('fs');
const MkDir = require('mkdirp');
const RmDir = require('rimraf');

exports.mkDirSync = MkDir.sync;
exports.mkDir = MkDir;
exports.rmDirSync = RmDir.sync;
exports.rmDir = RmDir;

exports.isFile = (file) => {

    try {
        return Fs.statSync(file).isFile();
    }
    catch (e) {
        return false;
    }
};

exports.isDir = (p) => {

    try {
        return Fs.statSync(p).isDirectory();
    }
    catch (e) {
        return false;
    }
};
