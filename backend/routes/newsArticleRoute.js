var express = require('express');
var user_route = express();

const auth = require('../middleware/auth');

const articleController = require('../controllers/newsArticleController');
const userController = require('../controllers/User/userController');

const validateForm = require('../validation/validation');

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.get('/analyticsdata', /*auth.islogin ,*/ articleController.getanalyticsdata);
//user_route.post('/login', articleController.loginUser); 

user_route.post('/userPortfolioMessage', articleController.validateForm, articleController.userPortfolioMessage); 
user_route.get('/getcredentials', articleController.getCredentials); 

user_route.post('/registerUser', validateForm, userController.registerUser);

user_route.post('/login', userController.loginUser);

user_route.get('/getUserDetails', userController.getUserDetails);

user_route.get('/getAllUserDetails', userController.getAllUserDetails);

module.exports = user_route;



