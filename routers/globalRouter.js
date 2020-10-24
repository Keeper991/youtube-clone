import express from "express";
import { join, login, logout, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, join);
globalRouter.post(routes.join, join, postLogin);

globalRouter.get(routes.login, login);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
