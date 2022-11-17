const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//Get Routes

//Post Routes
router.post("/logIn", userController.logIn);
router.post("/signUp", userController.signUp);
router.post(
	"/userProfile",
	userController.authToken,
	userController.userProfile
);

//Patch Routes

//Delete Routes

module.exports = router;
