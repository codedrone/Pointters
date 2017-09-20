const { create: createShipment } = require('../../../stores/shipment');

module.exports = async(ctx) => {
    const shipmentToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    const shipment = await createShipment(shipmentToCreate);

    if (!shipment || shipment.error) ctx.throw(404, shipment.error.message);

    ctx.body = { success: true, shipment };
};
