const express = require("express");
const router = express.Router();
const {
  showSignupPage,
  handleSignup,
  showLoginPage,
  handleLogin,
  handleLogout,
} = require("../controllers/UserController.js");

// Sign-up route
router.get("/signup", showSignupPage);
router.post("/signup", handleSignup);

// Login route
router.get("/login", showLoginPage);
router.post("/login", handleLogin);
// logout route
router.get("/logout", handleLogout);
module.exports = router;
