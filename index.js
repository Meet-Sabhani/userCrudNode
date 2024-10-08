import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Add CORS middleware
import route from "./routes/userRoute.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS to allow cross-origin requests

// Environment variables
const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/users";

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err?.message);
  });

// Routes
app.use("/api", route);
