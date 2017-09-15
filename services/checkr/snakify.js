const snake = require('to-snake-case');


const snakify = (obj) => {
    const keys = Object.keys(obj);
    return keys.map((key) => snake(key))
        .reduce((res, key, index) => {
            res[key] = typeof obj[keys[index]] === 'object' ?
            snakify(obj[keys[index]]) :
                obj[keys[index]];
            return res;
        }, {});
};

module.exports = snakify;
