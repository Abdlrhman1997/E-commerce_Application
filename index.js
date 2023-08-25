import express from "express";
import dbConnection from "./DB/dbConnection.js";
import bootstrap from "./src/bootstrap.js";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(morgan("dev"));

const upload = multer({ dest: "uploads/" });
app.use(upload.single("img"));

dbConnection();
bootstrap(app);
app.listen(port, () => console.log(`running on port ${port}`));
