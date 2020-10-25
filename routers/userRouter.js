import express from "express";
import routes from "../routes";
import {
  changePassword,
  editProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate, uploadUser } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadUser, editProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
