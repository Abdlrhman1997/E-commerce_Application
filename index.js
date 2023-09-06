import express from "express";
import dbConnection from "./DB/dbConnection.js";
import bootstrap from "./src/bootstrap.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));
dbConnection();
bootstrap(app);
app.listen(port, () => console.log(`running on port ${port}`));
