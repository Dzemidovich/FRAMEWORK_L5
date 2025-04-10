const http = require('http');
const CustomServer = require('./src/db/db');
const { museumRoutes } = require('./src/routes/v1/museumRoutes');
const logger = require('./src/middlewares/logger');

class Server extends CustomServer {
  constructor() {
    super();
    this.use(logger);
    this.registerRoutes();
  }

  registerRoutes() {
    museumRoutes(this);
  }
}

const server = new Server();
const PORT = process.env.PORT || 3000;
server.start(PORT);
