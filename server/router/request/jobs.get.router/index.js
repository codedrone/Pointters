const { getJobs } = require('../../../controllers/request');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .delete('/jobs', validate({ body, params }), getJobs);

module.exports = router.routes();