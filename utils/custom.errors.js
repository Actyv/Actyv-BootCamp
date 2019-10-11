class UserNotFoundException extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = "UserNotFoundException"
  }
}

class MongooseConnectionError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.name = "MongooseConnectionError"
  }
}

module.exports = {
  UserNotFoundException,
  MongooseConnectionError
}