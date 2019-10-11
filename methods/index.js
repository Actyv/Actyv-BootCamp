/**
 * Mongoose Schema Methods for User model.
 */

const { userSchema } = require("../schema/index");

/**
 * Static methods: These are the methods which are used to query the whole collection.
 * - Add a function property to schema.statics
 */
userSchema.statics.findByAge = function(age, callback) {
  this.find({ age: age }, callback);
};

/**
 * Static methods
 * - Call the Schema#static() function
 */
userSchema.static("findByLastName", function(lastname, callback) {
  this.find({ lastname: lastname }, callback);
});
