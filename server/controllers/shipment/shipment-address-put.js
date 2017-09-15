const {update} = require('../../../stores/shipment');

module.exports = async (ctx) => {
    const addressToUpdate = ctx.request.body;
    const query = {
        userId: ctx.state.user.id,
        _id: ctx.params.idShipment,
    };
    const { error, address} = await update(query, {address: addressToUpdate});

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true, address };
};
