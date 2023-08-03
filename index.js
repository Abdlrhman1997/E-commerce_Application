import express from "express";
import dbConnection from "./DB/dbConnection.js";
import bootstrap from "./src/bootstrap.js";
const app = express();
const port = 3000;
app.use(express.json());
dbConnection();
bootstrap(app);
app.listen(port, () => console.log(`running on port ${port}`));
