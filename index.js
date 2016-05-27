var http = require('http');
var url = require('url');
var request = require('request');
var __ = require('lodash');

var server = http.createServer(onRequest);

function onRequest(req, res) {
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();

        var targetUrl = req.headers['_target-url_'];

        var reqOption = {
            method: req.method,
            url: targetUrl,
            headers: {}
        };

        var authorization = req.headers['Authorization'] || req.headers['authorization'];
        if (authorization) {
            reqOption.headers['Authorization'] = authorization;
        }

        if (targetUrl) {
            request(reqOption).on('error', function(e) {
                res.end(e);
            }).pipe(res);
        }
        else {
            res.end('Url not provided');
        }

    });

}

console.log("listening on port 5050")
server.listen(5050);