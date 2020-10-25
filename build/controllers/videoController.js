"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delComment = exports.addComment = exports.registerView = exports.deleteVideo = exports.editVideo = exports.videoDetail = exports.upload = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({});

          case 3:
            videos = _context.sent;
            res.render("home", {
              pageTitle: "Home",
              videos: videos
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.render("home", {
              pageTitle: "Home",
              videos: []
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingFor, videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingFor = req.query.term;
            videos = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _Video["default"].find({
              title: {
                $regex: searchingFor,
                $options: "i"
              }
            });

          case 5:
            videos = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 11:
            res.render("search", {
              pageTitle: "Search",
              searchingFor: searchingFor,
              videos: videos
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.search = search;

var upload = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, location, newVideo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(req.method === "GET")) {
              _context3.next = 4;
              break;
            }

            res.render("upload", {
              pageTitle: "Upload"
            });
            _context3.next = 13;
            break;

          case 4:
            if (!(req.method === "POST")) {
              _context3.next = 13;
              break;
            }

            _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location;
            _context3.next = 8;
            return _Video["default"].create({
              fileUrl: location,
              title: title,
              description: description,
              creator: req.user.id
            });

          case 8:
            newVideo = _context3.sent;
            req.user.videos.push(newVideo.id);
            _context3.next = 12;
            return req.user.save();

          case 12:
            res.redirect(_routes["default"].videoDetail(newVideo.id));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function upload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.upload = upload;

var videoDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Video["default"].findById(id).populate("creator").populate("comments");

          case 4:
            video = _context4.sent;
            res.render("videoDetail", {
              pageTitle: video.title,
              video: video
            });
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes["default"].home);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var editVideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, video, _id, _req$body2, title, description;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(req.method === "GET")) {
              _context5.next = 18;
              break;
            }

            id = req.params.id;
            _context5.prev = 2;
            _context5.next = 5;
            return _Video["default"].findById(id);

          case 5:
            video = _context5.sent;

            if (!(!req.user || video.creator.toString() !== req.user.id)) {
              _context5.next = 10;
              break;
            }

            throw Error("Unauthenticated Access");

          case 10:
            res.render("editVideo", {
              pageTitle: "Edit Video",
              video: video
            });

          case 11:
            _context5.next = 16;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](2);
            res.redirect(_routes["default"].home);

          case 16:
            _context5.next = 29;
            break;

          case 18:
            if (!(req.method === "POST")) {
              _context5.next = 29;
              break;
            }

            _id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context5.prev = 20;
            _context5.next = 23;
            return _Video["default"].findOneAndUpdate({
              _id: _id
            }, {
              title: title,
              description: description
            });

          case 23:
            res.redirect(_routes["default"].videoDetail(_id));
            _context5.next = 29;
            break;

          case 26:
            _context5.prev = 26;
            _context5.t1 = _context5["catch"](20);
            res.redirect(_routes["default"].home);

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 13], [20, 26]]);
  }));

  return function editVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.editVideo = editVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, user, video, idx;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context6.prev = 1;
            _context6.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context6.sent;

            if (!(!user || video.creator.toString() !== user.id)) {
              _context6.next = 9;
              break;
            }

            throw Error("Unauthenticated Access");

          case 9:
            _context6.next = 11;
            return _Video["default"].findOneAndRemove({
              _id: id
            });

          case 11:
            idx = user.videos.indexOf(id);
            user.videos.splice(idx, 1);
            user.save();
            _context6.next = 19;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);

          case 19:
            res.redirect(_routes["default"].home);

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 16]]);
  }));

  return function deleteVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteVideo = deleteVideo;

var registerView = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context7.sent;
            video.views += 1;
            video.save();
            res.status(200);
            _context7.next = 13;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](1);
            res.status(400);

          case 13:
            _context7.prev = 13;
            res.end();
            return _context7.finish(13);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 10, 13, 16]]);
  }));

  return function registerView(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.registerView = registerView;

var addComment = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, comment, user, video, newComment;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context8.prev = 1;
            _context8.next = 4;
            return _Video["default"].findById(id).populate("comments");

          case 4:
            video = _context8.sent;
            _context8.next = 7;
            return _Comment["default"].create({
              text: comment,
              creator: user.id,
              video: id
            });

          case 7:
            newComment = _context8.sent;
            video.comments.push(newComment.id);
            user.comments.push(newComment.id);
            _context8.next = 12;
            return video.save();

          case 12:
            _context8.next = 14;
            return user.save();

          case 14:
            _context8.next = 19;
            break;

          case 16:
            _context8.prev = 16;
            _context8.t0 = _context8["catch"](1);
            res.status(400);

          case 19:
            _context8.prev = 19;
            res.end();
            return _context8.finish(19);

          case 22:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 16, 19, 22]]);
  }));

  return function addComment(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.addComment = addComment;

var delComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var id, comment, user, video, videoComments, commentId, i, idx;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context9.prev = 1;
            _context9.next = 4;
            return _Video["default"].findById(id).populate("comments");

          case 4:
            video = _context9.sent;
            videoComments = video.comments;
            i = 0;

          case 7:
            if (!(i < videoComments.length)) {
              _context9.next = 15;
              break;
            }

            if (!(videoComments[i].text === comment)) {
              _context9.next = 12;
              break;
            }

            // eslint-disable-next-line no-underscore-dangle
            commentId = videoComments[i]._id;
            videoComments.splice(i, 1);
            return _context9.abrupt("break", 15);

          case 12:
            i += 1;
            _context9.next = 7;
            break;

          case 15:
            video.save();
            _context9.next = 18;
            return _Comment["default"].findOneAndRemove({
              _id: commentId
            });

          case 18:
            idx = user.comments.indexOf(commentId);
            user.comments.splice(idx, 1);
            user.save();
            _context9.next = 26;
            break;

          case 23:
            _context9.prev = 23;
            _context9.t0 = _context9["catch"](1);
            res.status(400);

          case 26:
            _context9.prev = 26;
            res.end();
            return _context9.finish(26);

          case 29:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 23, 26, 29]]);
  }));

  return function delComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.delComment = delComment;