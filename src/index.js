import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

import connect from "./cofig/databse.js";
import apiRoutes from "./routes/index.js";
import { passportAuth } from "./cofig/jwt.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("Server started on PORT:", PORT);
  await connect();
});
