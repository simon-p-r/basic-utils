'use strict';

const Eval = require('vm').runInNewContext;

const internals = {};

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

internals.isFunction = function (value) {

    return (!!value) && (value.constructor === Function);

};

internals.isNumber = function (value) {

    return (!!value) && (value.constructor === Number);

};

internals.isUndefined = function (value) {

    return value === void 0;

};

internals.isNull = function (value) {

    return value === null;

};

internals.isObjectID = (value) => {

    if (!value) {
        return false;
    }
    return (/^[0-9a-fA-F]{24}$/).test(value);

};

internals.serialize = function (obj) {

    // Returns value and converts if it is a function to a string
    try {
        return JSON.stringify(obj, (key, value) => {

            if (internals.isFunction(value)) {
                return value.toString();
            }
            return value;
        }, 4);

    }
    catch (e) {

        return e;
    }

};

internals.deserialize = function (str) {

    try {
        return JSON.parse(str, (key, value) => {

            if (!internals.isString(value)) {
                return value;
            }
            return (value.substring(0, 8) === 'function') ? Eval('(' + value + ')') : value;
        });
    }
    catch (e) {

        return e;
    }

};


exports = module.exports = internals;
