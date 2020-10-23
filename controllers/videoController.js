import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = (req, res) => {
  const {
    query: { term: searchingFor },
  } = req;
  res.render("search", { pageTitle: "Search", searchingFor });
};
export const upload = async (req, res) => {
  if (req.method === "GET") {
    res.render("upload", { pageTitle: "Upload" });
  } else if (req.method === "POST") {
    const {
      body: { title, description },
      file: { path },
    } = req;
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description,
    });
    res.redirect(routes.videoDetail(newVideo.id));
  }
};
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const editVideo = async (req, res) => {
  if (req.method === "GET") {
    const {
      params: { id },
    } = req;
    try {
      const video = await Video.findById(id);
      res.render("editVideo", { pageTitle: "Edit Video", video });
    } catch (error) {
      res.redirect(routes.home);
    }
  } else if (req.method === "POST") {
    const {
      params: { id },
      body: { title, description },
    } = req;
    try {
      await Video.findOneAndUpdate({ _id: id }, { title, description });
      res.redirect(routes.videoDetail(id));
    } catch (error) {
      res.redirect(routes.home);
      res.video();
    }
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
