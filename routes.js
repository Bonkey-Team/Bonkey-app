const routes = require('next-routes')();

routes
  .add('/', '/index')
  .add('/deposit/index', '/deposit/index')
  .add('/proposal/index', '/proposal/index')
  .add('/withdraw/index', '/withdraw/index')

module.exports = routes;
