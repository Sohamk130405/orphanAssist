const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const path = require("path");
const session = require("express-session");
const {
  showSignupPage,
  handleSignup,
  showLoginPage,
  handleLogin,
  handleLogout,
  handleUpload,
  showDashboard,
  handleReject,
  handleAccept,
} = require("./controllers/indexController");

app.use(
  session({
    secret: "1234567890",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);
app.use(fileUpload());
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.render("pages/index/home", { user: req.session.user || null });
});

app.get("/dashboard/:id", showDashboard);

app.get("/signup", showSignupPage);
app.get("/login", showLoginPage);
app.get("/logout", handleLogout);

app.post("/signup", handleSignup);
app.post("/login", handleLogin);
app.post("/upload", handleUpload);

// Accept request
app.post("/requests/accept/:id", handleAccept);

// Reject request
app.post("/requests/reject/:id", handleReject);
