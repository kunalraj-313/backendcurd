const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Counter= require('../models/counterModel')


const userSchema = new mongoose.Schema({
  id:{
    type:Number,
    required:true,
    unique:true
  },
  name:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are manadatory");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

userSchema.statics.signup = async function (email, password,name) {
  if (!email || !password || !name) {
    throw Error("All fields are manadatory");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong Enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const update = await Counter.findOneAndUpdate(
    { _id: "userId" }, 
    { $inc: { seq: 1 } }, 
    { new: true, upsert: true }
  );
  const userId = update.seq;

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ id: userId, email, password: hash ,name});

  return user;
};

module.exports = mongoose.model("User", userSchema);
