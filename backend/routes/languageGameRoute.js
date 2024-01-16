var express = require("express");
var user_route = express();

const auth = require("../middleware/auth");

const userController = require("../controllers/User/userController");
const questionController = require("../controllers/Question/questionController");

const validateForm = require("../validation/validation");

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.post("/registerUser", validateForm, userController.registerUser);

user_route.post("/login", userController.loginUser);

user_route.get("/getUserDetails", userController.getUserDetails);

user_route.get("/getAllUserDetails", userController.getAllUserDetails);

user_route.post("/addQuestion", questionController.addQuestion);

module.exports = user_route;
