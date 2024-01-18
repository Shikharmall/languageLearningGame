const User = require("../../models/User/userModel");

const { validationResult } = require("express-validator");
 
const bcrypt = require("bcrypt");

const securePasswordGenerate = async (password) => {
  try {
    const passwordhash = bcrypt.hash(password, 10);
    return passwordhash;
  } catch (error) {
    console.log(error.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, rePassword } = req.body;

    ///checking format of name , email and password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "failed", errors: errors.array() });
    }

    // Find email if exist
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res
        .status(409)
        .json({ status: "failed", message: "Email Already Exist" });
    }

    // check password match
    if (password !== rePassword) {
      return res
        .status(422)
        .json({ status: "failed", message: "Password Not Matched" });
    }

    // generate secure password by bycrpting it
    const spassword = await securePasswordGenerate(password);

    const userData = new User({
      name: name,
      email: email,
      password: spassword,
      rank: 0,
      isAdmin: false,
      image: "image.png",
    });

    const userDataSaved = await userData.save();

    if (userDataSaved) {
      return res.status(201).json({ status: "success", data: userDataSaved });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const userData = await User.findOne({ email });

    if (!userData) {
      return res
        .status(404)
        .json({ status: "failed", message: "Email Not Exist" });
    }

    const matchPassword = await bcrypt.compare(password, userData.password);

    if (!matchPassword) {
      return res
        .status(404)
        .json({ status: "failed", message: "Password Not Matched" });
    }

    return res
      .status(200)
      .json({ status: "success", data: { user_id: userData._id } });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { user_id } = req.query;

    // Find the user by email
    const userData = await User.findById({ _id: user_id });

    if (!userData) {
      return res
        .status(404)
        .json({ status: "failed", message: "User Not Exit" });
    }

    return res.status(200).json({ status: "success", data: userData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getAllUserDetails = async (req, res) => {
  try {
    // Find the user by email
    const userData = await User.find().sort({ score: 'desc' });

    return res.status(200).json({ status: "success", data: userData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  getAllUserDetails,
};
