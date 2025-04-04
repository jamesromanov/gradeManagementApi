const { connectDb } = require("./config/db");
const app = require("./middlewares/app");
connectDb();
app.listen(process.env.PORT || 4000, () => {
  console.log("server is running on:", process.env.PORT || 4000);
});
