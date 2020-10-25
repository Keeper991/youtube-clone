"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadUser = exports.uploadVideo = exports.onlyPrivate = exports.onlyPublic = exports.localsMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});
var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "metube-bandor/video"
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "metube-bandor/avatar"
  })
});

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "MeTube";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
};

exports.localsMiddleware = localsMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (!req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPrivate = onlyPrivate;
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadUser = multerAvatar.single("avatar");
exports.uploadUser = uploadUser;