import express from "express";
import routes from "../routes";
import {
  deleteVideo,
  editVideo,
  upload,
  videoDetail,
} from "../controllers/videoController";
import { uploadVideo } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get(routes.upload, upload);
videoRouter.post(routes.upload, uploadVideo, upload);
videoRouter.get(routes.editVideo(), editVideo);
videoRouter.post(routes.editVideo(), editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
