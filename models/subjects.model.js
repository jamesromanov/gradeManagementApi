const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name of the subject is required!"] },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", select: false },
});

module.exports = mongoose.model("Subject", subjectSchema);
