const client = require("./prisma/client");
const express = require("express");
const logger = require("morgan");
const path = require("path");
require("dotenv").config();
const indexRouter = require("./routes/index");
const fileRouter = require("./routes/file");
const userRouter = require("./routes/user");
const folderRouter = require("./routes/folder");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const port = process.env.PORT || 3000;
const app = express();

const sessionConfig = {
  cookie: { maxAge: 1000 * 3600, httpOnly: true, secure: true },
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: new PrismaSessionStore(client, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};

app.use(session(sessionConfig));
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
