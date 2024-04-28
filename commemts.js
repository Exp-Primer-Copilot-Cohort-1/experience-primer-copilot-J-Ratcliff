// Create web server
// 1. Create a web server
// 2. Read the file
// 3. Send the file to the browser
// 4. Show the file in the browser

// Require the http module
var http = require('http');
// Require the fs module
var fs = require('fs');

// Create a server
var server = http.createServer(function(req, res) {
    console.log('Request was made: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    // Read the file
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    // Send the file to the browser
    myReadStream.pipe(res);
});

// Listen to a port
server.listen(3000, 'localhost'); // Fixed the unterminated string literal error by adding a closing quotation mark

