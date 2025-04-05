const express = require("express");
const gradesRouter = express.Router();
const protect = require("../middlewares/protector");
const checkRole = require("../middlewares/checkRole");
const gradesController = require("../controllers/grades.controller");

gradesRouter
  .route("/me")
  .get(protect, checkRole(["student"]), gradesController.stuGrades);
gradesRouter
  .route("/:id")
  .get(protect, checkRole(["teacher"]), gradesController.getGrades);
gradesRouter
  .route("/")
  .post(protect, checkRole(["teacher"]), gradesController.addGrades);
module.exports = gradesRouter;
