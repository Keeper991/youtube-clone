import passport from "passport";
import request from "request-promise-native";
import routes from "../routes";
import User from "../models/User";

export const join = async (req, res, next) => {
  if (req.method === "GET") {
    res.render("join", { pageTitle: "Join" });
  } else if (req.method === "POST") {
    const {
      body: { name, email, password, password2 },
    } = req;
    if (password !== password2) {
      req.flash("error", "Passwords don't match ❌");
      res.status(400);
      res.render("join", { pageTitle: "Join" });
    } else {
      try {
        const user = await User.findOne({ email });
        if (user) {
          user.name = name;
          await user.setPassword(password);
          await user.save();
        } else {
          const newUser = await User({
            name,
            email,
          });
          await User.register(newUser, password);
        }
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
  successFlash: "Welcome to MeTube 😎",
  failureFlash: "Please check email and/or password 😫",
});

export const getGithubLogin = passport.authenticate("github", {
  successFlash: "Welcome to MeTube 😎",
  failureFlash: "Can't log in at this time.. 😫",
});

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
  // eslint-disable-next-line consistent-return
) => {
  const {
    _json: { id, avatar_url: avatarUrl, name },
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
        user.avatarUrl = avatarUrl;
        await user.save();
        return cb(null, user);
      }
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl,
      });
      console.log(newUser);
      return cb(null, newUser);
    } catch (error) {
      return cb(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFacebookLogin = passport.authenticate("facebook", {
  scope: ["email"],
  successFlash: "Welcome to MeTube 😎",
  failureFlash: "Can't log in at this time.. 😫",
});

export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, name, email },
  } = profile;
  const avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = avatarUrl;
      await user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl,
    });
    console.log(newUser);
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.flash("info", "Logged out successfully, see you later 👍");
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).populate("videos");
  res.render("userDetail", { pageTitle: "User Detail", user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User not found 👻");
    res.redirect(routes.home);
  }
};

export const editProfile = async (req, res) => {
  if (req.method === "GET") {
    res.render("editProfile", { pageTitle: "Edit Profile" });
  } else if (req.method === "POST") {
    const {
      body: { name, email },
      file,
    } = req;
    try {
      await User.findByIdAndUpdate(req.user.id, {
        name,
        email,
        avatarUrl: file ? file.path : req.user.avatarUrl,
      });
      req.flash("success", "Profile updated 😎");
      res.redirect(routes.me);
    } catch (error) {
      req.flash("error", "Can't update profile 🤔");
      res.redirect(routes.editProfile);
    }
  }
};
export const changePassword = async (req, res) => {
  if (req.method === "GET") {
    res.render("changePassword", { pageTitle: "Change Password" });
  } else if (req.method === "POST") {
    const {
      body: { oldPassword, newPassword, newPassword2 },
    } = req;
    console.log(newPassword, newPassword2);
    if (newPassword !== newPassword2) {
      req.flash("error", "Passwords don't match ❌");
      res
        .status(400)
        .render("changePassword", { pageTitle: "Change Password" });
    } else {
      try {
        await req.user.changePassword(oldPassword, newPassword);
        req.flash("success", "Changed password successfully! 😍");
        res.redirect(routes.me);
      } catch (error) {
        req.flash("error", "Can't change password 🧐");
        res
          .status(400)
          .render("changePassword", { pageTitle: "Change Password" });
      }
    }
  }
};
