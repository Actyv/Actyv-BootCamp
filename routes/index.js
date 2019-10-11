const userController = require("../controller/index");

/**
 *Initializing the express router
 */
const express = require("express");
const router = express.Router();

router.get("/test", userController.testUser);

/**
 * POST request to create a new user
 */
router.post("/create", userController.createUser);

/**
 * GET requests read a user by it's id
 */
router.get("/read/:name", userController.readUser);

/**
 * GET requests read a last name of the user
 */
router.get("/lastname", userController.getByLastName);

/**
 * POST requests to update the user
 */
router.put("/update/:id", userController.updateUser);

/**
 * DELETE request to delete the user
 */
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
