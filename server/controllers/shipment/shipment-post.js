const { create: createCategory } = require('../../../stores/shipment');

module.exports = async(ctx) => {
    const shipmentToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    const shipment = await createCategory(shipmentToCreate);

    if (shipment.error) ctx.throw(404, shipment.error.message);

    ctx.body = { success: true, shipment };
};
