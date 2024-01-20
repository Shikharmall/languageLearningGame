var express = require("express");
var user_route = express();

const isDDAdmin = require("../middleware/isDDAdmin");

const isLogin = require("../middleware/isLogin");

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

user_route.get("/getUserDetails", isLogin, userController.getUserDetails);

// api for getting all user details

user_route.get("/getAllUserDetails", isLogin, userController.getAllUserDetails);

// api for adding question

user_route.post(
  "/addQuestion",
  isLogin,
  isDDAdmin,
  questionController.addQuestion
);

// api for getting a question

user_route.get("/getQuestion", isLogin, questionController.getQuestion);

// api for getting all questions

user_route.get(
  "/getAllQuestions",
  isLogin,
  isDDAdmin,
  questionController.getAllQuestions
);

// api for adding user response to database(db)

user_route.post(
  "/addResponseToUser",
  isLogin,
  responseController.addResponseToUser
);

// api for getting question by id

user_route.get(
  "/getQuestionByID",
  isLogin,
  isDDAdmin,
  questionController.getQuestionByID
);

// api for getting all user details by language

user_route.get(
  "/getAllUserDetailsByLanguage",
  isLogin,
  userController.getAllUserDetailsByLanguage
);

// api for updating question

user_route.patch(
  "/updateQuestion",
  isLogin,
  isDDAdmin,
  questionController.updateQuestion
);

// api for getting user response

user_route.get("/getUserResponse", isLogin, responseController.getUserResponse);

// api for getting user english response

user_route.get(
  "/getUserResponseEnglish",
  isLogin,
  responseController.getUserResponseEnglish
);

// api for getting user hindi response

user_route.get(
  "/getUserResponseHindi",
  isLogin,
  responseController.getUserResponseHindi
);

// api for getting user french response

user_route.get(
  "/getUserResponseFrench",
  isLogin,
  responseController.getUserResponseFrench
);

// api for resetting progress

user_route.patch("/resetProgress", isLogin, responseController.resetProgress);

// api for logout

user_route.post("/logout", isLogin, userController.logout);

module.exports = user_route;
