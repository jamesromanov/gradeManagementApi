const { response } = require("../utils/response");
const gradesModel = require("../models/grades.model");
const errorHandler = require("../utils/errorHandler");

const addGrades = errorHandler(async (req, res, next) => {
  let { student, subject, grade, teacher } = req.body;
  teacher = req.user.id;
  let checking = await gradesModel.find({
    student: student,
    subject: subject,
    teacher: teacher,
  });
  if (checking.length) throw new Error("You have already graded this student!");
  let Grade = await gradesModel.create({ student, subject, grade, teacher });
  response(res, Grade, 201);
});
const getGrades = errorHandler(async (req, res, next) => {
  let id = req.params.id;
  let student = await gradesModel.findById(id);
  if (!student) throw new Error("pls enter the correct id!");
  response(res, student);
});
const stuGrades = errorHandler(async (req, res, next) => {
  let student = req.user.id;
  let Student = await gradesModel
    .find({ student })
    .populate("subject student")
    .select({ teacher: 0 });

  if (!Student) throw new Error("Not found!");
  response(res, Student);
});
module.exports = { addGrades, getGrades, stuGrades };
