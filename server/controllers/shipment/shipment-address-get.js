const {findOne} = require('../../../stores/shipment');

module.exports = async (ctx) => {
    const query = {
        _id: ctx.params.idShipment,
    };
    const {address, error} = await findOne(query);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true, address };
};
