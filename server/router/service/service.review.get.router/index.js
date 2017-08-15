const { getserviceReview } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
    .get('/service/:reviewId/review', validate({ body: schema }), getserviceReview);

module.exports = router;
