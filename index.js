import express from "express";
import dbConnection from "./DB/dbConnection.js";
import bootstrap from "./src/bootstrap.js";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "./src/middleware/ErrorHandling.js";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + " - " + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("images only"), false);
  }
}

const upload = multer({ storage, fileFilter });
app.use(upload.single("img"));

dbConnection();
bootstrap(app);
app.listen(port, () => console.log(`running on port ${port}`));
