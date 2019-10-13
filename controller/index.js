/**
 * Mongoose User model.
 */
const { User } = require("../schema/index");
const { logger } = require("../Logger/index");
const mongoose = require("mongoose");
const HttpStatus = require("http-status-codes");
const {
  UserNotFoundException,
  MongooseConnectionError
} = require("../utils/custom.errors");

module.exports.testUser = (req, res) => {
  res.json({ message: "Works" });
};
/*------------------------------CREATE OPERATIONS--------------------------*/
/**
 * Creating the new user
 */
module.exports.createUser = (req, res) => {
  // Creating a user object from frontend data
  User.create(req.body, (err, user) => {
    if (err) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json(err);
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: "User Registered Successfully" });
  });
};

/*------------------------------READ OPERATIONS--------------------------*/

/**
 * Reading the existing user using request parameters.
 */
module.exports.readUser = async (req, res, next) => {
  try {
    // readyState to check if mongoose connection is open
    const { readyState } = mongoose.connection;

    // throw MongooseConnectionError if readyState is 0 means connection is not established
    if (readyState === 0)
      throw MongooseConnectionError("MongoDB Not Connected");

    // Find user with given id
    const user = await User.find({ _id: req.params.id });

    // throw UserNotFoundException if user is null means user is not found
    if (user === null || user.length === 0)
      throw new UserNotFoundException(
        `User with id: ${req.params.id} not found.`
      );

    // send user as response if user is found successfully
    res.status(HttpStatus.OK).json({ user, message: "User Found" });
  } catch (e) {
    switch (true) {
      // catch MongooseConnectionError if connection with mongoDB is not open
      case e instanceof MongooseConnectionError:
        console.log(e.name);
        logger.error(e.name, e.message);
        break;

      // catch CastError when id is invalid
      case e instanceof mongoose.Error.CastError:
        logger.error(e.name, e.message);
        break;

      // catch UserNotFoundException when user for given id is not found
      case e instanceof UserNotFoundException:
        logger.error(e.name, e.message);
        break;

      default:
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User Not Found" });
    }
    res.status(HttpStatus.NOT_FOUND).json({ message: "User Not Found" });
  } finally {
    next();
  }
};

/**
 * Reading the Last Name user using request parameters.
 */
module.exports.getByLastName = (req, res) => {
  // It was earlier defined as a static method inside methods/index.js
  User.findByLastName("Ch", function(err, data) {
    try {
      if (data.length === 0 || err) throw err;
      res.status(HttpStatus.OK).json({ data });
    } catch (error) {
      logger.error("The return object is " + error);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.name + ": " + error.message });
    }
  });
};

/**
 * Updating the exisiting user from the database collection
 */
module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    try {
      if (err) throw err;

      res.status(HttpStatus.OK).json({ user });
    } catch (error) {
      logger.error(error.name, error.message);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.name + ": " + error.message });
    }
  });
};

/*------------------------------DELETE OPERATION--------------------------*/

/**
 * Deleting the existing user from the database.
 */
module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, err => {
    try {
      if (err) throw err;

      res.status(HttpStatus.OK).json({ message: "User Removed" });
    } catch (error) {
      logger.error(error.name, error.message);
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: error.name + ": " + error.message });
    }
  });
};
