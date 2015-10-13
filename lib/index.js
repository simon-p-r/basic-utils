'use strict';

var Eval = require('vm').runInNewContext;


var internals = {};

internals.isObj = function (value) {

    return (!!value) && (value.constructor === Object);

};

internals.isString = function (value) {

    return (!!value) && (value.constructor === String);

};

internals.isArray = function (value) {

    return (!!value) && (value.constructor === Array);

};

internals.isDate = function (value) {

    return (!!value) && (value.constructor === Date);

};

internals.isRegex = function (value) {

    return (!!value) && (value.constructor === RegExp);

};

internals.serialize = function (obj) {

    // Returns value and converts if it is a function to a string
    try {
        return JSON.stringify(obj, function (key, value) {

            if (typeof value === 'function') {
                return value.toString();
            }
            return value;
        }, 4);

    } catch (e) {

        return e;
    }

};

internals.deserialize = function (str) {

    try {
        return JSON.parse(str, function (key, value){

            if (typeof value !== 'string') {
                return value;
            }
            return (value.substring(0, 8) === 'function') ? Eval('(' + value + ')') : value;
        });
    } catch (e) {

        return e;
    }

};


exports = module.exports = internals;
