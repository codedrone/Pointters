const Schema = require('../../../databases/mongo').Schema;


module.exports = new Schema({
    city: {
        type: String
    },
    country: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    postalCode: {
        type: String
    },
    province: {
        type: String
    },
    state: {
        type: String
    }
});
