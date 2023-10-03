#!/usr/bin/env node

const http = require("http");
const app = require("./app");
const debug = require('debug')('Store-app:server');
const server = http.createServer(app);
const PORT = 3000

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port)

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log(`App listening on Port ${PORT}`);



function normalizePort(val) {
	let port = parseInt(val, 10);
  
	if (isNaN(port)) {
	  // named pipe
	  return val;
	}
  
	if (port >= 0) {
	  // port number
	  return port;
	}
  
	return false;
  }
  
  /**
   * Event listener for HTTP server "error" event.
   */
  
  function onError(error) {
	if (error.syscall !== 'listen') {
	  throw error;
	}
  
	let bind = typeof port === 'string'
	  ? 'Pipe ' + port
	  : 'Port ' + port;
  
	// handle specific listen errors with friendly messages
	switch (error.code) {
	  case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	  case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	  default:
		throw error;
	}
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
	  ? 'pipe ' + addr
	  : 'port ' + addr.port;
	debug('Listening on ' + bind);
  }