var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser=require('body-parser');
const flash = require("express-flash-notification");
const session = require("express-session");
const passport=require('./src/helper/passport');
var expressLayouts = require("express-ejs-layouts");
const { connect } = require("./src/config/db");


var app = express();
connect();

// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
// app.set("layout", "admin");
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(session({
  secret: "cnttvietnhatk17",
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  flash(app, {
    viewName: "admin/elements/notify",
  })
);

app.use("/", require("./src/routes"));

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;