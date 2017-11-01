const { getservicedetail } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router.get('/service/:id/detail', validate({ body: schema }), getservicedetail);

module.exports = router.routes();