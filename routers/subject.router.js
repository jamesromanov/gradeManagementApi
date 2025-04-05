const express = require("express");
const protect = require("../middlewares/protector");
const checkRole = require("../middlewares/checkRole");
const subjectController = require("../controllers/subject.controller");

const subjectRouter = express.Router();

subjectRouter
  .route("/")
  .post(protect, checkRole(["teacher"]), subjectController.addSubject);

subjectRouter
  .route("/")
  .get(protect, checkRole(["teacher"]), subjectController.getSubjects);

module.exports = subjectRouter;
