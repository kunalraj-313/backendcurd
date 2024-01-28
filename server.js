const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModal");

const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
const cors = require("cors");

app.use(cors());
app.options("*", cors());

app.use("/cash-manager/user", userRoutes);

mongoose.connect(`${process.env.MONGO_URI}`, () => {
  console.log("Connected to Database");
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(process.env.PORT || 5000);
