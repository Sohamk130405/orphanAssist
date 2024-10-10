const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const indexRoutes = require("./routes/indexRoutes");
const requestRoutes = require("./routes/requestRoutes");
const orgRoutes = require("./routes/orgRoutes");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const path = require("path");
const session = require("express-session");

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

// Routes
app.use("/api", indexRoutes);
// app.use("/organization", orgRoutes);
// app.use("/request", requestRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
  
});

app.get("/", (req, res) => {
  res.render("pages/index/home", { user: req.session.user || null });
  console.log(req.session.user);
});
