'use strict';

const Eval = require('vm').runInNewContext;

const internals = {};

internals.ipv4 = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
internals.ipv6 = new RegExp(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/);
internals.MacAddress = new RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);

exports.isObj = (value) => {

    return (!!value) && (value.constructor === Object);

};

exports.isString = (value) => {

    return (!!value) && (value.constructor === String);

};

exports.isArray = (value) => {

    return (!!value) && (value.constructor === Array);

};

exports.isDate = (value) => {

    return (!!value) && (value.constructor === Date);

};

exports.isRegex = (value) => {

    return (!!value) && (value.constructor === RegExp);

};

exports.isFunction = (value) => {

    return (!!value) && (value.constructor === Function);

};

exports.isNumber = (value) => {

    return (!!value) && (value.constructor === Number);

};

exports.isUndefined = (value) => {

    return value === void 0;

};

exports.isNull = (value) => {

    return value === null;

};

exports.isEmpty = (value) => {

    return exports.isUndefined(value) || exports.isNull(value);
};

exports.isObjectID = (value) => {

    if (!value) {
        return false;
    }
    return (/^[0-9a-fA-F]{24}$/).test(value);

};


exports.isIp = (input) => {

    if (!exports.isString(input)) {
        return false;
    }

    return internals.ipv4.test(input) || internals.ipv6.test(input);
};

exports.isIp6 = (input) => {

    if (!exports.isString(input)) {
        return false;
    }

    return internals.ipv6.test(input);
};

exports.isIp4 = (input) => {

    if (!exports.isString(input)) {
        return false;
    }

    return internals.ipv4.test(input);
};

exports.isMac = (input) => {

    if (!exports.isString(input)) {
        return false;
    }

    return internals.MacAddress.test(input);
};

exports.serialize = (obj) => {

    // Returns value and converts if it is a function to a string
    try {
        return JSON.stringify(obj, (key, value) => {

            if (exports.isFunction(value)) {
                return value.toString();
            }
            return value;
        }, 4);

    }
    catch (e) {

        return e;
    }

};

exports.deserialize = (str) => {

    try {
        return JSON.parse(str, (key, value) => {

            if (!exports.isString(value)) {
                return value;
            }
            return (value.substring(0, 8) === 'function') ? Eval('(' + value + ')') : value;
        });
    }
    catch (e) {

        return e;
    }

};
