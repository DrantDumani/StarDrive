const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const indexRouter = require("./routes/index");
const fileRouter = require("./routes/file");
const userRouter = require("./routes/user");
const folderRouter = require("./routes/folder");

const port = process.env.PORT || 3000;
const app = express();

app.use("/", indexRouter);
app.use("files", fileRouter);
app.use("users", userRouter);
app.use("folders", folderRouter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
