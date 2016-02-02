/* * * * * * * * * * * *
 * Module dependencies *
 * * * * * * * * * * * */
const app = require('../app');
const debug = require('debug')('game-platform:server');
const http = require('http');

// Defined below; declared here to prevent jshint warnings
let port;
let server;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * Normalize a port into a number, string, or false  *  
 * * * * * * * * * * * * * * * * * * * * * * * * * * */
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

/* * * * * * * * * * * * * * * * * * * * * * * * *
 * Event listener for HTTP server "error" event. *
 * * * * * * * * * * * * * * * * * * * * * * * * */
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

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Event listener for HTTP server "listening" event. *
 * * * * * * * * * * * * * * * * * * * * * * * * * * */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Get server IP address from environment and store. *
 * * * * * * * * * * * * * * * * * * * * * * * * * * */

let ipaddress = process.env.OPENSHIFT_NODEJS_IP ||
                process.env.OPENSHIFT_INTERNAL_IP;

if (typeof ipaddress === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_*_IP var, using 127.0.0.1');
    ipaddress = "127.0.0.1";
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * Get port from environment and store in Express. *
 * * * * * * * * * * * * * * * * * * * * * * * * * */
if(ipaddress !==  "127.0.0.1") {
	port = normalizePort( process.env.OPENSHIFT_NODEJS_PORT   ||
    					  process.env.OPENSHIFT_INTERNAL_PORT || 8080 );
} else {          
	port = normalizePort( process.env.PORT || 3000 );
}
app.set('port', port);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *  terminator === the termination handler               *
 *  Terminate server on receipt of the specified signal. *
 *  @param {string} sig  Signal to terminate on.         *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let terminator = function(sig){
    if (typeof sig === "string") {
       console.log('%s: Received %s - terminating app ...',
                   Date(Date.now()), sig);
       process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()) );
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  Setup termination handlers (for exit and a list of signals). *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
let setupTerminationHandlers = function(){
    //  Process on exit and signals.
    process.on('exit', function() { terminator(); });

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() { terminator(element); });
    });
};
setupTerminationHandlers();

/* * * * * * * * * * * *
 * Create HTTP server. *
 * * * * * * * * * * * */
server = http.createServer( app );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Listen on provided port, on all network interfaces. *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



