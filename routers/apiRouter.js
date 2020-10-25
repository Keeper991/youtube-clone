import express from "express";
import routes from "../routes";
import { onlyPrivate } from "../middlewares";
import {
  addComment,
  delComment,
  registerView,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.comment, addComment);
apiRouter.delete(routes.comment, delComment);

export default apiRouter;
