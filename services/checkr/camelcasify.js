const camelcase = require('camelcase');


const camelcasify = (obj) => {
    const keys = Object.keys(obj);
    return keys.map((key) => camelcase(key))
        .reduce((res, key, index) => {
            res[key] = typeof obj[keys[index]] === 'object' ?
            camelcasify(obj[keys[index]]) :
                obj[keys[index]];
            return res;
        }, {});
};
module.exports = camelcasify;
