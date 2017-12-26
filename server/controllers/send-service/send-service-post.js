const { create: createSendService } = require('../../../stores/send-service');

module.exports = async(ctx) => {
    const sendService = await createSendService(ctx.request.body);

    if (sendService.error) ctx.throw(404, sendService.error.message);

    ctx.body = { success: true, sendService };
};
