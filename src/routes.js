// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// User

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = `${GITHUB}/callback`;

// Facebook

const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = `${FACEBOOK}/callback`;

// API

const API = "/api";
const REGISTER_VIEW = "/:id/view";
const COMMENT = "/:id/comment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,

  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `${USERS}/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,

  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) {
      return `${VIDEOS}/${id}`;
    }
    return VIDEO_DETAIL;
  },
  editVideo: (id) => {
    if (id) {
      return `${VIDEOS}/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  deleteVideo: (id) => {
    if (id) {
      return `${VIDEOS}/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  comment: COMMENT,
};

export default routes;
