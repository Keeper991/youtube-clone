import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import path from "path";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

// // CSP header
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "img 'self' data:");
  next();
});

app.use("/static", express.static(path.join(__dirname, "static")));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
