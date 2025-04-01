const http = require('http');  
const url = require('url');  

class CustomServer {  
  constructor() {  
    this.routes = {  
      GET: {},  
      POST: {},  
      PUT: {},  
      PATCH: {},  
      DELETE: {}  
    };  
    this.middlewares = [];  
  }  

  use(middleware) {  
    this.middlewares.push(middleware);  
  }  

  handleRequest(req, res) {  
    const { method, url: requestUrl } = req;  
    const parsedUrl = url.parse(requestUrl, true);  
    req.query = parsedUrl.query;  
    req.params = {};  

    const runMiddlewares = (i) => {  
      if (i < this.middlewares.length) {  
        const middleware = this.middlewares[i];  
        middleware(req, res, () => runMiddlewares(i + 1));  
      } else {  
        const routeHandler = this.routes[method][parsedUrl.pathname];  
        if (routeHandler) {  
          routeHandler(req, res);  
        } else {  
          this.sendResponse(res, 404, { message: 'Не найдено' });  
        }  
      }  
    };  

    runMiddlewares(0);  
  }  

  sendResponse(res, statusCode, data) {  
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });  
    res.end(JSON.stringify(data));  
  }  

  start(port) {  
    const server = http.createServer(this.handleRequest.bind(this));  
    server.listen(port, () => {  
      console.log(`Сервер запущен на порту ${port}`);  
    });  
  }  

  registerRoute(method, path, handler) {  
    this.routes[method][path] = handler;  
  }  
}  

const server = new CustomServer();  

server.use((req, res, next) => {  
  console.log(`${req.method} ${req.url}`);  
  next();  
});  

server.registerRoute('GET', '/test', (req, res) => {  
  this.sendResponse(res, 200, { message: 'GET запрос успешен' });  
});  

server.registerRoute('POST', '/test', (req, res) => {  
  req.on('data', (chunk) => {  
    req.body = JSON.parse(chunk);  
    this.sendResponse(res, 200, { message: 'POST запрос успешен', data: req.body });  
  });  
});  

const PORT = process.argv[2] || 3000;  
server.start(PORT);  