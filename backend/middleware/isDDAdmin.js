const User = require("../models/User/userModel");

const isDDAdmin = async (req, res, next) => {
  try {
    const userFound = await User.findById(req.user_id);

    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!userFound.isAdmin) {
      return res
        .status(403)
        .json({ error: "Access denied. User is not an admin." });
    }

    // If the user is found and is an admin, continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in isDDAdmin middleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = isDDAdmin;
