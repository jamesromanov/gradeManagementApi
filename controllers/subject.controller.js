const { response } = require("../utils/response");
const usersModel = require("../models/users.model");
const errorHandler = require("../utils/errorHandler");
const subjectsModel = require("../models/subjects.model");

const addSubject = errorHandler(async (req, res, next) => {
  let { name, teacher } = req.body;
  if (!name) throw new Error(`Pls fill name field!`);
  teacher = req.user.id;

  let checking = await subjectsModel.find({ name: name, teacher: teacher });
  if (checking.length)
    throw new Error(`This subject and teacher already exits!`);
  let subject = await subjectsModel.create({ name, teacher });
  response(res, subject, 201);
});

const getSubjects = errorHandler(async (req, res, next) => {
  let subjects = await subjectsModel.find();
  response(res, subjects);
});

module.exports = { getSubjects, addSubject };
