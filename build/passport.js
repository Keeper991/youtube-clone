"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github2"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _User = _interopRequireDefault(require("./models/User"));

var _routes = _interopRequireDefault(require("./routes"));

var _userController = require("./controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000".concat(_routes["default"].githubCallback)
}, _userController.githubLoginCallback));

_passport["default"].use(new _passportFacebook["default"]({
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  // this callbackURL should change whenever you restart ngrok..
  callbackURL: "https://2a928ffea594.ngrok.io".concat(_routes["default"].facebookCallback),
  profileFields: ["id", "displayName", "photos", "email"]
}, _userController.facebookLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());