import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingFor },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingFor, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingFor, videos });
};
export const upload = async (req, res) => {
  if (req.method === "GET") {
    res.render("upload", { pageTitle: "Upload" });
  } else if (req.method === "POST") {
    const {
      body: { title, description },
      file: { location },
    } = req;
    const newVideo = await Video.create({
      fileUrl: location,
      title,
      description,
      creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    await req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  }
};
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
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
      if (!req.user || video.creator.toString() !== req.user.id) {
        throw Error("Unauthenticated Access");
      } else {
        res.render("editVideo", { pageTitle: "Edit Video", video });
      }
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
    }
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    if (!user || video.creator.toString() !== user.id) {
      throw Error("Unauthenticated Access");
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
    const idx = user.videos.indexOf(id);
    user.videos.splice(idx, 1);
    user.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const registerView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const addComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  try {
    const video = await Video.findById(id).populate("comments");
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      video: id,
    });
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);
    await video.save();
    await user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const delComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  try {
    const video = await Video.findById(id).populate("comments");
    const { comments: videoComments } = video;
    let commentId;
    for (let i = 0; i < videoComments.length; i += 1) {
      if (videoComments[i].text === comment) {
        // eslint-disable-next-line no-underscore-dangle
        commentId = videoComments[i]._id;
        videoComments.splice(i, 1);
        break;
      }
    }
    video.save();
    await Comment.findOneAndRemove({ _id: commentId });
    const idx = user.comments.indexOf(commentId);
    user.comments.splice(idx, 1);
    user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
