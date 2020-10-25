"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = exports.editProfile = exports.userDetail = exports.getMe = exports.logout = exports.postFacebookLogin = exports.facebookLoginCallback = exports.getFacebookLogin = exports.githubLoginCallback = exports.postGithubLogin = exports.getGithubLogin = exports.postLogin = exports.getLogin = exports.join = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var join = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user, newUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.method === "GET")) {
              _context.next = 4;
              break;
            }

            res.render("join", {
              pageTitle: "Join"
            });
            _context.next = 35;
            break;

          case 4:
            if (!(req.method === "POST")) {
              _context.next = 35;
              break;
            }

            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password !== password2)) {
              _context.next = 11;
              break;
            }

            res.status(400);
            res.render("join", {
              pageTitle: "Join"
            });
            _context.next = 35;
            break;

          case 11:
            _context.prev = 11;
            _context.next = 14;
            return _User["default"].findOne({
              email: email
            });

          case 14:
            user = _context.sent;

            if (!user) {
              _context.next = 23;
              break;
            }

            user.name = name;
            _context.next = 19;
            return user.setPassword(password);

          case 19:
            _context.next = 21;
            return user.save();

          case 21:
            _context.next = 28;
            break;

          case 23:
            _context.next = 25;
            return (0, _User["default"])({
              name: name,
              email: email
            });

          case 25:
            newUser = _context.sent;
            _context.next = 28;
            return _User["default"].register(newUser, password);

          case 28:
            next();
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](11);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 31]]);
  }));

  return function join(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.join = join;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Log In"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home
});

exports.postLogin = postLogin;

var getGithubLogin = _passport["default"].authenticate("github");

exports.getGithubLogin = getGithubLogin;

var postGithubLogin = function postGithubLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postGithubLogin = postGithubLogin;

var githubLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(accessToken, refreshToken, profile, cb // eslint-disable-next-line consistent-return
  ) {
    var _profile$_json, id, avatarUrl, name, opt, res, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatarUrl = _profile$_json.avatar_url, name = _profile$_json.name;
            opt = {
              url: "https://api.github.com/user/emails",
              json: true,
              headers: {
                "User-Agent": "Request-Promise",
                Authorization: "token ".concat(accessToken)
              }
            };
            _context2.prev = 2;
            _context2.next = 5;
            return (0, _requestPromiseNative["default"])(opt);

          case 5:
            res = _context2.sent;
            email = res[0].email;
            _context2.prev = 7;
            _context2.next = 10;
            return _User["default"].findOne({
              email: email
            });

          case 10:
            user = _context2.sent;

            if (!user) {
              _context2.next = 17;
              break;
            }

            user.githubId = id;
            user.avatarUrl = avatarUrl;
            _context2.next = 16;
            return user.save();

          case 16:
            return _context2.abrupt("return", cb(null, user));

          case 17:
            _context2.next = 19;
            return _User["default"].create({
              email: email,
              name: name,
              githubId: id,
              avatarUrl: avatarUrl
            });

          case 19:
            newUser = _context2.sent;
            console.log(newUser);
            return _context2.abrupt("return", cb(null, newUser));

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](7);
            return _context2.abrupt("return", cb(_context2.t0));

          case 27:
            _context2.next = 32;
            break;

          case 29:
            _context2.prev = 29;
            _context2.t1 = _context2["catch"](2);
            console.log(_context2.t1);

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 29], [7, 24]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var getFacebookLogin = _passport["default"].authenticate("facebook", {
  scope: ["email"]
});

exports.getFacebookLogin = getFacebookLogin;

var facebookLoginCallback = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(accessToken, refreshToken, profile, cb) {
    var _profile$_json2, id, name, email, avatarUrl, user, newUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _profile$_json2 = profile._json, id = _profile$_json2.id, name = _profile$_json2.name, email = _profile$_json2.email;
            avatarUrl = "https://graph.facebook.com/".concat(id, "/picture?type=large");
            _context3.prev = 2;
            _context3.next = 5;
            return _User["default"].findOne({
              email: email
            });

          case 5:
            user = _context3.sent;

            if (!user) {
              _context3.next = 12;
              break;
            }

            user.facebookId = id;
            user.avatarUrl = avatarUrl;
            _context3.next = 11;
            return user.save();

          case 11:
            return _context3.abrupt("return", cb(null, user));

          case 12:
            _context3.next = 14;
            return _User["default"].create({
              email: email,
              name: name,
              facebookId: id,
              avatarUrl: avatarUrl
            });

          case 14:
            newUser = _context3.sent;
            console.log(newUser);
            return _context3.abrupt("return", cb(null, newUser));

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](2);
            return _context3.abrupt("return", cb(_context3.t0));

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 19]]);
  }));

  return function facebookLoginCallback(_x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

exports.facebookLoginCallback = facebookLoginCallback;

var postFacebookLogin = function postFacebookLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postFacebookLogin = postFacebookLogin;

var logout = function logout(req, res) {
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var getMe = function getMe(req, res) {
  res.render("userDetail", {
    pageTitle: "User Detail",
    user: req.user
  });
};

exports.getMe = getMe;

var userDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findById(id).populate("videos");

          case 4:
            user = _context4.sent;
            console.log(user.videos);
            res.render("userDetail", {
              pageTitle: "User Detail",
              user: user
            });
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            res.redirect(_routes["default"].home);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function userDetail(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var editProfile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, name, email, file;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(req.method === "GET")) {
              _context5.next = 4;
              break;
            }

            res.render("editProfile", {
              pageTitle: "Edit Profile"
            });
            _context5.next = 15;
            break;

          case 4:
            if (!(req.method === "POST")) {
              _context5.next = 15;
              break;
            }

            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, file = req.file;
            _context5.prev = 6;
            _context5.next = 9;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: file ? file.path : req.user.avatarUrl
            });

          case 9:
            res.redirect(_routes["default"].me);
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](6);
            res.redirect(_routes["default"].editProfile);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[6, 12]]);
  }));

  return function editProfile(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.editProfile = editProfile;

var changePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword2;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(req.method === "GET")) {
              _context6.next = 4;
              break;
            }

            res.render("changePassword", {
              pageTitle: "Change Password"
            });
            _context6.next = 20;
            break;

          case 4:
            if (!(req.method === "POST")) {
              _context6.next = 20;
              break;
            }

            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword2 = _req$body3.newPassword2;
            console.log(newPassword, newPassword2);

            if (!(newPassword !== newPassword2)) {
              _context6.next = 11;
              break;
            }

            res.status(400).render("changePassword", {
              pageTitle: "Change Password"
            });
            _context6.next = 20;
            break;

          case 11:
            _context6.prev = 11;
            _context6.next = 14;
            return req.user.changePassword(oldPassword, newPassword);

          case 14:
            res.redirect(_routes["default"].me);
            _context6.next = 20;
            break;

          case 17:
            _context6.prev = 17;
            _context6.t0 = _context6["catch"](11);
            res.status(400).render("changePassword", {
              pageTitle: "Change Password"
            });

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[11, 17]]);
  }));

  return function changePassword(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

exports.changePassword = changePassword;