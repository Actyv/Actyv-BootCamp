/**
 * Express is a Node.js web application framework
 */
const express = require("express");

/**
 * Initializing the express routers.
 */
const app = express();

/**
 * Initializing the mongoose connection.
 */
const users = require("./routes/index");

/**
 * Requiring the mongoose connection
 */
require("./connection/mongoose");

app.use(express.json())
app.use("/users", users);

module.exports = app;
