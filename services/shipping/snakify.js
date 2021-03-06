const snake = require('to-snake-case');


const snakify = (obj) => {
    if (typeof obj !== 'object') return obj;
    const keys = Object.keys(obj);
    return keys.map((key) => snake(key))
        .reduce((res, key, index) => {
            res[key] = res[key] = obj[keys[index]] &&
            typeof obj[keys[index]] === 'object' &&
            !Array.isArray(obj[keys[index]]) ?
            snakify(obj[keys[index]]) :
            Array.isArray(obj[keys[index]]) ?
            obj[keys[index]].map(snakify) :
             obj[keys[index]];
            return res;
        }, {});
};
module.exports = snakify;
