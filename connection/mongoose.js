const mongoose = require("mongoose");

const { logger } = require("../Logger/index");
/**
 * Loading environment variables
 */
require("dotenv").config();

/**
 * Opening Mongoose Connection
 */
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => {

  switch (error.name) {

    // catch MongoParseError if URI is not correct
    case "MongoParseError":
      logger.error(error.name, error.message)
      break;

    // catch MongoNetworkError if credientials are not correct
    case "MongoNetworkError":
      logger.error(error.name, error.message)
      break;

    default:
      logger.error(error.name, error.message)

    //dont loose stack
    //
  }

})

/**
 * Connected Handler
 */
mongoose.connection.on("connected", () => {
  logger.info("MongoDB connected Successfully!!");
});

/**
 * Mongoose Disconnected Handler
 */
mongoose.connection.on("disconnected", () => {
  logger.warn("Mongoose connection is disconnected");
});

/**
 * Unexpected Shutdown Handler
 */
process.on("SIGINT", function () {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
