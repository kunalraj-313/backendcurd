const express = require("express");

const { signupUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/user/login", loginUser);

router.post("/user/signup", signupUser);

module.exports = router;
