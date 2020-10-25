/* eslint-disable import/first */
// eslint-disable-next-line import/no-extraneous-dependencies
import "@babel/polyfill";
import "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅  Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, "0.0.0.0", handleListening);
