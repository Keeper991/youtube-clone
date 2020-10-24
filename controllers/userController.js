import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import request from "request-promise-native";

export const join = async (req, res, next) => {
  if (req.method === "GET") {
    res.render("join", { pageTitle: "Join" });
  } else if (req.method === "POST") {
    const {
      body: { name, email, password, password2 },
    } = req;
    if (password !== password2) {
      res.status(400);
      res.render("join", { pageTitle: "Join" });
    } else {
      try {
        const user = await User({
          name,
          email,
        });
        await User.register(user, password);
        next();
      } catch (error) {
        console.log(error);
        res.redirect(routes.home);
      }
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const getGithubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name },
  } = profile;

  const opt = {
    url: "https://api.github.com/user/emails",
    json: true,
    headers: {
      "User-Agent": "Request-Promise",
      Authorization: `token ${accessToken}`,
    },
  };

  try {
    const res = await request(opt);
    const { email } = res[0];

    try {
      const user = await User.findOne({ email });
      if (user) {
        user.githubId = id;
        user.save();
        return cb(null, user);
      }
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      return cb(null, newUser);
    } catch (error) {
      return cb(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail" });
};
export const editProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};
export const changePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Change Password" });
};
