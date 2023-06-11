const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB server");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB server");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

// Express body parser
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

// Routes
app.use("/api", require("./routes/api.js"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
