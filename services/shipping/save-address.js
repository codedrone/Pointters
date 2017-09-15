const client = require('./client');
const snakify = require('./snakify');
const camelcasify = require('./camelcasify');
module.exports = async(address) => {
    if (!address) return await Promise.reject(new Error('addres no given'));
    const addressSnakify = snakify(address);
    const addressSaved = await new client.Address(addressSnakify).save();
    return camelcasify(addressSaved);
};
