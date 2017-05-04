var http = require('http'),
	finalhandler = require('finalhandler'),
	serveStatic = require('serve-static'),
	serve = serveStatic("./public"),
	port = 3000,
server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});
server.listen(port, function () {
	console.log('Server running at http://localhost:' + port + '/');
});
