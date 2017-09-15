const camelcase = require('camelcase');


const camelcasify = (obj) => {
    console.log('obj = ', obj);
    const keys = Object.keys(obj);
    return keys.map((key) => camelcase(key))
        .reduce((res, key, index) => {
            console.log('obj[keys[index]] ', obj[keys[index]]);
            res[key] = obj[keys[index]] && typeof obj[keys[index]] === 'object' ?
            camelcasify(obj[keys[index]]) :
                obj[keys[index]];
            return res;
        }, {});
};
module.exports = camelcasify;
