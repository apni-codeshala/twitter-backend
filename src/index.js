const express = require("express");
const dotenv = require("dotenv");

const connect = require("./cofig/databse");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("Server started on PORT: 3000");
  await connect();
});
