'use strict';

const DeepFreeze = require('deep-freeze');
const Eval = require('vm').runInNewContext;
const Types = require('./types');


exports.deepFreeze = DeepFreeze;


exports.iterateObj = (obj) => {

    let txt = '';
    for (const key of (Object.keys(obj))) {
        if (typeof obj[key] === 'string') {
            txt += key + '~' + obj[key] + '\n';
        }
    }
    return txt;
};


exports.format = function () {

    const args = Array.from(arguments);
    let str = args.shift();
    const items = args;
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        const sep = `{${i}}`;
        str = str.replace(sep, item);

    }
    return str;
};


exports.serialize = (obj) => {

    // Returns value and converts if it is a function to a string
    try {
        return JSON.stringify(obj, (key, value) => {

            if (Types.isFunction(value)) {
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

            if (!Types.isString(value)) {
                return value;
            }
            return (value.substring(0, 8) === 'function') ? Eval('(' + value + ')') : value;
        });
    }
    catch (e) {

        return e;
    }

};
