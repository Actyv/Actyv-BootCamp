/**
 * Importing  the mongoose driver.
 */
const mongoose = require("mongoose");

var explain = require('mongoose-explain');

/**
 * Extracting Schema property from mongoose.
 */
const Schema = mongoose.Schema;

/**
 * Everything in Mongoose starts with a Schema.
 * Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */

/**
 * Creating the new mongoose Schema.
 */

const userSchema = new Schema({
  /**
   * To declare a path as a string you may use either the String global constructor or the string 'String'.
   * @SchemaType - String
   * The string Schema type will have the built -in validators as:
   * lowercase, uppercase, trim, match, enum, minlength, maxlength
   */

  firstName: {
    type: String,
  },

  /**
   * @SchemaType - String
   */

  lastName: {
    type: String,
  },

  address: {
    city: {
      type: String,
      // index: true
    },
    street: {
      type: String
    },
    state: {
      type: String
    }
  },
});

userSchema.plugin(explain);

module.exports.userSchema = userSchema;

require("../methods/index");

const User = mongoose.model("UserModel", userSchema);

module.exports.User = User;
