const routes = require('next-routes')();

routes
  .add('/', '/index')
  .add('/project/:address', '/project/index')
  .add('/createProject', '/project/create')  
  // .add('/test', '/test/index')  
  

module.exports = routes;
