var express = require('express');
var http = require('http');
var app = express();
var port = process.env.PORT || 3000;
const index = require('./index.js');

app.get("/", function (req, res) { console.log(Date.now() + " Ping Received"); });

app.listen(port);

setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.herokuapp.com/`);
}, 280000);

index.botRun();