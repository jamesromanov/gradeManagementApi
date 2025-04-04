const express = require("express");
const authRouter = express.Router();
const protect = require("../middlewares/protector");
const checkRole = require("../middlewares/checkRole");
const authController = require("../controllers/auth.controller");

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter
  .route("/logout")
  .post(protect, checkRole(["teacher", "student"]), authController.logout);

module.exports = authRouter;
