const { Schema } = require('../../../../databases/mongo');


module.exports = new Schema({
    city: String,
    country: String,
    geoJson: Schema.Types.GeoJSON,
    postalCode: String,
    province: String,
    state: String
});
