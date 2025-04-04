const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose
      .connect(
        process.env.DATABASE.replace("<db_password>", process.env.PASSWORD) ??
          process.env.DATABASE
      )
      .then(() => {
        console.log("mongoDB connected succesfully!");
      });
  } catch (error) {
    console.log("Mongodb connection error:", error);
  }
};

module.exports = { connectDb };
