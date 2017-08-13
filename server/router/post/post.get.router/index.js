<<<<<<< HEAD
const { getservice } = require('../../../controllers/service');
const schema = require('./body-schema');
=======
const { getpost } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
>>>>>>> /user GET is updated to return other user
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD
router.get('/service/:idService', validate({ body: schema }), getservice);
=======
router.get('/post/:idPost', validate({ body, params }), getpost);
>>>>>>> /user GET is updated to return other user

module.exports = router;
