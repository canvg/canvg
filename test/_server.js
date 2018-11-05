const Promise = require("bluebird"),
  handler = require("serve-handler"),
  http = require("http");

Promise.Deferred = function() {
  var resolve, reject;
  var _promise = new Promise(function() {
    resolve = arguments[0];
    reject = arguments[1];
  });

  var promise = function() {
    return _promise;
  };

  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  };
};

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

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

const initServer = function(port) {
  const server = http.createServer((request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/zeit/serve-handler#options
    return handler(request, response);
  });

  /**
   * Get port from environment and store in Express.
   */
  const normalizedPort = normalizePort(port || process.env.PORT || 3123);

  /**
   * Event listener for HTTP server "error" event.
   */
  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    let bind =
      typeof normalizedPort === "string"
        ? "Pipe " + normalizedPort
        : "Port " + normalizedPort;

    // handle specific listen errors with friendly messages
    let errmsg;
    switch (error.code) {
      case "EACCES":
        errmsg = `${bind} requires elevated privileges`;
        console.error(errmsg);
        // closeMe();
        break;
      case "EADDRINUSE":
        errmsg = `${bind} is already in use`;
        console.error();
        // closeMe();
        break;
      default:
        throw error;
    }
  }

  server.ready = new Promise.Deferred();

  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log(`Listening on ${bind}`);
  }

  server.on("error", onError);
  server.once("listening", onListening);

  server.on("close", function() {
    console.log(`Closing server on ${normalizedPort}`);
  });

  process.on("SIGTERM", function() {
    server.close();
  });

  process.on("SIGINT", function() {
    server.close();
  });

  server.listen(normalizedPort, () => {
    console.log(`Running at http://localhost:${normalizedPort}`);
    server.ready.resolve(server);
  });

  return server;
};

if (require.main === module) {
  let server = initServer(3123);
  server.ready.promise().then(() => {
    console.log("Server ready");
  });
}
module.exports = initServer;
