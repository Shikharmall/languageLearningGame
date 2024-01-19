var express = require("express");
var user_route = express();

const isDDAdmin = require("../middleware/isDDAdmin");

const userController = require("../controllers/User/userController");
const questionController = require("../controllers/Question/questionController");
const responseController = require("../controllers/Response/responseController");

const validateForm = require("../validation/validation");

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// api for register user

user_route.post("/registerUser", validateForm, userController.registerUser);

// api for login

user_route.post("/login", userController.loginUser);

// api for getting user details

user_route.get("/getUserDetails", userController.getUserDetails);

// api for getting all user details

user_route.get("/getAllUserDetails", userController.getAllUserDetails);

// api for adding question

user_route.post("/addQuestion", questionController.addQuestion);

// api for getting a question

user_route.get("/getQuestion", questionController.getQuestion);

// api for getting all questions

user_route.get("/getAllQuestions", questionController.getAllQuestions);

// api for adding user response to database(db)

user_route.post("/addResponseToUser", responseController.addResponseToUser);

// api for getting question by id

user_route.get("/getQuestionByID", questionController.getQuestionByID);

// api for getting all user details by language

user_route.get(
  "/getAllUserDetailsByLanguage",
  userController.getAllUserDetailsByLanguage
);

// api for updating question

user_route.patch("/updateQuestion", questionController.updateQuestion);

// api for getting user response

user_route.get("/getUserResponse", responseController.getUserResponse);

// api for getting user english response

user_route.get(
  "/getUserResponseEnglish",
  responseController.getUserResponseEnglish
);

// api for getting user hindi response

user_route.get(
  "/getUserResponseHindi",
  responseController.getUserResponseHindi
);

// api for getting user french response

user_route.get(
  "/getUserResponseFrench",
  responseController.getUserResponseFrench
);

// api for resetting progress

user_route.patch("/resetProgress", responseController.resetProgress);

module.exports = user_route;
