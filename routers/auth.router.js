const express = require("express");

const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter.route("/logout").post(authController.logout);

module.exports = authRouter;
