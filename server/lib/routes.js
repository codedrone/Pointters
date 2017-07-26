const fs = require('fs');
const path = require('path');

const errors = require('./middelwares/errors');

const routerPath = path.resolve(__dirname, '../routers');
const routerNameRegex = /.*router.*/;
const routersFolder = fs.readdirSync(routerPath);

module.exports = (app) => {
    routersFolder.forEach((file) => {
        if (!routerNameRegex.test(file)) return;

        const pathToRouter = path.resolve(routerPath, file);
        const router = require(pathToRouter);
        app.use(router);
    });

    app.route('/:url(api|auth|components)/*').get(errors[404]);


    app.route('/*')
        .get((req, res) => {
            res.json({name: 'Pointters API v1'});
        });
};
