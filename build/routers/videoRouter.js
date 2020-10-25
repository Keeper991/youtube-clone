"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get(_routes["default"].upload, _middlewares.onlyPrivate, _videoController.upload);
videoRouter.post(_routes["default"].upload, _middlewares.onlyPrivate, _middlewares.uploadVideo, _videoController.upload);
videoRouter.get(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoController.editVideo);
videoRouter.post(_routes["default"].editVideo(), _middlewares.onlyPrivate, _videoController.editVideo);
videoRouter.get(_routes["default"].deleteVideo(), _middlewares.onlyPrivate, _videoController.deleteVideo);
videoRouter.get(_routes["default"].videoDetail(), _videoController.videoDetail);
var _default = videoRouter;
exports["default"] = _default;