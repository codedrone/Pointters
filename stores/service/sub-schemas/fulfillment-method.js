const Schema = require('../../../databases/mongo').Schema;

module.exports = new Schema({
    local: {
        type: Boolean
    },
    online: {
        type: Boolean
    },
    shipment: {
        type: Boolean
    },
    store: {
        type: Boolean
    }
});
