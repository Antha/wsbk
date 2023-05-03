var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/npa.web.key', 'utf8');
var certificate = fs.readFileSync('sslcert/npa.web.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appRoute = require('./src/routes/route-poi');
app.use('/', appRoute);


var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8479);
app.listen(9077, ()=>{
    console.log('Server Berjalan di Port : 9077');
});