const { deleteOrder } = require('../../../controllers/order');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();


router.delete('/order/:idOrder', validate({ body, params }), deleteOrder);

module.exports = router.routes();
