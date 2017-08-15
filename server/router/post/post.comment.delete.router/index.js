const { deletepostComment } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();


console.log(__dirname);
router.delete('/post/:idComment/comment', validate({ body, params }), deletepostComment);

module.exports = router;
