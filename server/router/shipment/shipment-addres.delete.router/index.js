const { deleteShipmentAddress } = require('../../../controllers/shipment');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

const path = '/shipment/:idShipment/address';
router.delete(path, validate({ body, params }), deleteShipmentAddress
);

module.exports = router;
