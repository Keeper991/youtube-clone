import passport from "passport";
import GitHubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import routes from "./routes";
import {
  facebookLoginCallback,
  githubLoginCallback,
} from "./controllers/userController";

passport.use(User.createStrategy());
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://radiant-hollows-22783.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      // this callbackURL should change whenever you restart ngrok..
      callbackURL: `https://2a928ffea594.ngrok.io${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
