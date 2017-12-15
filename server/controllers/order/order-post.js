const { create: createOrder } = require('../../../stores/order');

module.exports = async(ctx) => {
    const orderToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    //const { error } = await createOrder(orderToCreate);
    const order = await createOrder(orderToCreate);
    console.log(order);

    if (order.error) ctx.throw(404, error.message);

    ctx.body = { order: order};
};
