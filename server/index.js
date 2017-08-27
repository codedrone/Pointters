const app = require('./lib/app');
const { port } = require('../config');
const attachSocket = require('../lib/socket');
require('./lib/routes')(app);

const server = require('http').createServer(app.callback());
attachSocket(server);
server._start = () => server.listen(port, () => console.info(`Express server listening on %d${port}`));

if (!module.parent) server._start();

module.exports = server;
