import express from "express";
import routes from "../routes";
import {
  deleteVideo,
  editVideo,
  upload,
  videoDetail,
} from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, upload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, upload);

videoRouter.get(routes.editVideo(), onlyPrivate, editVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, editVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
