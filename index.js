import express from "express";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT} 😎`);
};

const indexController = (req, res) => {
  res.send("Hello~");
};

const middleware = (req, res, next) => {
  console.log("middle ware!!!");
};

app.use(helmet());
app.use(morgan("dev"));

app.get("/", indexController);

app.listen(PORT, handleListening);
