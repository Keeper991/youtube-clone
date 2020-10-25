import express from "express";
import passport from "passport";
import {
  join,
  getLogin,
  logout,
  postLogin,
  getGithubLogin,
  postGithubLogin,
  getFacebookLogin,
  getMe,
  postFacebookLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, join);
globalRouter.post(routes.join, onlyPublic, join, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.github, onlyPublic, getGithubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

globalRouter.get(routes.facebook, onlyPublic, getFacebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  }),
  postFacebookLogin
);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.me, getMe);

export default globalRouter;
