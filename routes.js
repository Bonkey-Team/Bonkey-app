const routes = require('next-routes')();

routes
  .add('/createProject', '/index')  
  .add('/BonkeyFactory', '/bonkeyfactory/index')
  .add('/deposit/index', '/deposit/index')
  .add('/deposit/index', '/deposit/index')
  .add('/proposal/index', '/proposal/index')
  .add('/withdraw/index', '/withdraw/index')
  .add('/testPage', '/test/index')
  .add('/project/:address', '/project/index')

module.exports = routes;
