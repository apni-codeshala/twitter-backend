import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import connect from "./cofig/databse.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("Server started on PORT:", PORT);
  await connect();
});
