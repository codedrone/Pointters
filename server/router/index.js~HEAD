const fs = require('fs');
const path = require('path');

const compose = require('koa-compose');

const servicePath = path.resolve(__dirname, './');
const routerNameRegex = /^.*router$/;
const Folder = fs.readdirSync(servicePath);

const services = [];
Folder.forEach((service) => {
    if (service === 'index.js') return;
    const pathToService = path.resolve(servicePath, service);
    const serviceFolder = fs.readdirSync(pathToService);
    const serviceRouters = [];
    serviceFolder.forEach((possibleRouter) => {
        if (!routerNameRegex.test(possibleRouter)) return;
        const pathToRouter = path.resolve(pathToService, possibleRouter);
        const router = require(pathToRouter);
        serviceRouters.push(router.routes());
    });
    services.push(compose(serviceRouters));
});

module.exports = compose(services);
