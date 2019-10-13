/**
 * Module containing middlewares and routes
 */
const app = require("../app");

/**
 * Loading environment variables
 */
require("dotenv").config();

/**
 * Setting the port to application
 */
app.set("port", process.env.PORT || 3000);

/**
 * HTTP module
 */
const http = require("http");

/**
 * Creating HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided connected port.
 */

server.listen(process.env.PORT || 3000);

module.exports = server;
