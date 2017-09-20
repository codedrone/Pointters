const saveAddress = require('./save-address');
const saveParcel = require('./save-parcel');

module.exports = {
    address:{
        save:saveAddress
    },
    parcel:{
        save:saveParcel
    }
};
