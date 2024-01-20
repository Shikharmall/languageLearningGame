var express = require("express");

const cookieParser = require("cookie-parser");
var app = express();

require("dotenv").config();

const port = process.env.PORT || 5174;

const mongoose = require("mongoose");

if (process.env.DATABASE === "MONGODBATLAS") {
  mongoose.connect(process.env.DATABASEURL);
  mongoose.connection.on("error", (err) => {
    console.log("Connection Failed");
  });
  mongoose.connection.on("connected", (connected) => {
    console.log("Connected to MongoDB Atlas.");
  });
} else {
  console.log("No proper ENV.");
}

app.use(cookieParser());
const cors = require("cors");

let allowedOrigins = [
  "http://localhost:5173",
  "https://language-learning-game-five.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

const languageGameRoutes = require("./routes/languageGameRoute");

app.use("/", languageGameRoutes);

app.listen(port);
