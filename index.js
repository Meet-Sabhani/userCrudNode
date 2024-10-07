import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());

const PORT = 7000;
console.log("PORT: ", PORT);
const MONGO_URL =
  "mongodb+srv://meetsabhani18:sUGMKV4C8zwUdpG4@cluster0.me3wl.mongodb.net/";

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

app.use("/api", route);
