import routes from "../routes";

export const join = (req, res) => {
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
      // To Do : Register user
      // To Do : Log user in
      res.redirect(routes.home);
    }
  }
};
export const login = (req, res) => res.render("login");
export const logout = (req, res) => res.render("Logout");
export const users = (req, res) => res.render("Users");
export const userDetail = (req, res) => res.render("User Detail");
export const editProfile = (req, res) => res.render("Edit Profile");
export const changePassword = (req, res) => res.render("Change Password");
