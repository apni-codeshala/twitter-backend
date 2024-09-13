import express from "express";
import dotenv from "dotenv";

import connect from "./cofig/databse.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("Server started on PORT:", PORT);
  await connect();
});
