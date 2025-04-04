const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    unique: [true, "email is unique!"],
    required: [true, "email is  required!"],
    validate: [validator.isEmail, "Email is invalid pls enter valid email!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    select: false,
    validate: [
      validator.isStrongPassword,
      "Password is invalid pls enter another password!",
    ],
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    select: false,
    required: [true, "role is required!"],
  },
  active: { type: Boolean, default: true, select: false },
});

userSchema.pre("save", async function (next) {
  let password = this.password;
  this.password = await bcrypt.hash(password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
