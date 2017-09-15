const {unset} = require('../../../stores/shipment');

module.exports = async (ctx) => {
    const query = {_id: ctx.params.idShipment};
    console.log(
        'query ', query
    );
    const address = await unset(query, {address:''});

    if (address.error) ctx.throw(404, address.error.message);

    ctx.body = { success: true };
};
