import express from "express";
import dbConnection from "./DB/dbConnection.js";
const app = express();
const port = 3000;

dbConnection();
app.listen(port, () => console.log(`running on port ${port}`));
