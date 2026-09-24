/*var httpProxy = require('http-proxy');
let fs = require('fs');

httpProxy.createServer({
    target: {
      host: '10.65.103.51',
      port: 9008
    },
    ssl: {
      key: fs.readFileSync('cert/server.key', 'utf8'),
      cert: fs.readFileSync('cert/server.cert', 'utf8')
    }
  }).listen(9008);
console.log("Proxy Server is running");*/