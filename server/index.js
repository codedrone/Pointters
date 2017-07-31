const app = require('./lib/app');
const { port } = require('../config');
require('./lib/routes')(app);

const server = require('http').createServer(app.callback());
server.listen(port, () => console.info(`Express server listening on %d${port}`));

module.exports = server;
