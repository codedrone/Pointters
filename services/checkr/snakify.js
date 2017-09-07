const snake = require('to-snake-case');


module.exports = (obj) => {
    const keys = Object.keys(obj);
    return keys.map((key) => snake(key))
        .reduce((res, key, index) => {
            res[key] = obj[keys[index]] ?
                obj[keys[index]].toString() :
                obj[keys[index]];
            return res;
        }, {});
};