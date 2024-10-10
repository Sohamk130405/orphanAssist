const express = require("express");
const router = express.Router();
const {
  showSignupPage,
  handleSignup,
  showLoginPage,
  handleLogin,
  handleLogout,
  handleUpload,
} = require("../controllers/indexController.js");

// Sign-up route
router.get("/signup", showSignupPage);
router.post("/signup", handleSignup);

// Login route
router.get("/login", showLoginPage);
router.post("/login", handleLogin);
// logout route
router.get("/logout", handleLogout);

// uploads route
router.post("/upload", handleUpload);
module.exports = router;
