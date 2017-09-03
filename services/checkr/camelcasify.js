const camelcase = require('camelcase');


module.exports = (obj) => {
    const keys = Object.keys(obj);
    return keys.map((key) => camelcase(key))
        .reduce((res, key, index) => {
            res[key] = obj[keys[index]] ?
                obj[keys[index]].toString() :
                obj[keys[index]];
            return res;
        }, {});
};
