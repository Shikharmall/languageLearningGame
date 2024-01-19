var express = require("express");
var user_route = express();

const auth = require("../middleware/auth");

const userController = require("../controllers/User/userController");
const questionController = require("../controllers/Question/questionController");
const responseController = require("../controllers/Response/responseController");

const validateForm = require("../validation/validation");

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.post("/registerUser", validateForm, userController.registerUser);

user_route.post("/login", userController.loginUser);

user_route.get("/getUserDetails", userController.getUserDetails);

user_route.get("/getAllUserDetails", userController.getAllUserDetails);

user_route.post("/addQuestion", questionController.addQuestion);

user_route.get("/getQuestion", questionController.getQuestion);

user_route.get("/getAllQuestions", questionController.getAllQuestions);

user_route.post("/addResponseToUser", responseController.addResponseToUser);

user_route.get("/getQuestionByID", questionController.getQuestionByID);

user_route.get(
  "/getAllUserDetailsByLanguage",
  userController.getAllUserDetailsByLanguage
);

user_route.patch("/updateQuestion", questionController.updateQuestion);

user_route.get("/getUserResponse", responseController.getUserResponse);

user_route.get(
  "/getUserResponseEnglish",
  responseController.getUserResponseEnglish
);

user_route.get(
  "/getUserResponseHindi",
  responseController.getUserResponseHindi
);

user_route.get(
  "/getUserResponseFrench",
  responseController.getUserResponseFrench
);

user_route.patch("/resetProgress", responseController.resetProgress);

module.exports = user_route;
