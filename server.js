const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");


const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/cash-manager/", userRoutes);
app.use("/cash-manager/",shopRoutes)

mongoose.connect(`${process.env.MONGO_URI}`, () => {
  console.log("Connected to Database");
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(process.env.PORT || 5000);
