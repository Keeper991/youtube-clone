import { videos } from "../db";

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const search = (req, res) => {
  const {
    query: { term: searchingFor },
  } = req;
  res.render("search", { pageTitle: "Search", searchingFor, videos });
};
export const upload = (req, res) => {
  if (req.method === "GET") {
    res.render("upload", { pageTitle: "Upload" });
  } else if (req.method === "POST") {
    const {
      body: { file, title, Description },
    } = req;
    // To Do: Upload and save video
    res.redirect(routes.videoDetail(324393));
  }
};
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
