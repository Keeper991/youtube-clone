import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";
import helmet from "helmet";
import { localsMiddleware } from "./middlewares";
import morgan from "morgan";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("view engine", "pug");

app.use(localsMiddleware);

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  next();
});

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
