"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; // User

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; // Videos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = "/:id/delete"; // Github

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "".concat(GITHUB, "/callback"); // Facebook

var FACEBOOK = "/auth/facebook";
var FACEBOOK_CALLBACK = "".concat(FACEBOOK, "/callback"); // API

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var COMMENT = "/:id/comment";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "".concat(USERS, "/").concat(id);
    }

    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "".concat(VIDEOS, "/").concat(id);
    }

    return VIDEO_DETAIL;
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "".concat(VIDEOS, "/").concat(id, "/edit");
    }

    return EDIT_VIDEO;
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "".concat(VIDEOS, "/").concat(id, "/delete");
    }

    return DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  comment: COMMENT
};
var _default = routes;
exports["default"] = _default;