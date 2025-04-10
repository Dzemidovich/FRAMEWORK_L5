const museumController = require('../../controllers/museumController');

exports.museumRoutes = (server) => {
  server.registerRoute('GET', '/api/v1/exhibits', museumController.getExhibits);
  server.registerRoute('GET', '/api/v1/exhibits/:id', museumController.getExhibit);
  server.registerRoute('POST', '/api/v1/exhibits', museumController.addExhibit);
};
