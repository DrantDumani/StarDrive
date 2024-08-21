const client = require("./prisma/client");
const express = require("express");
const logger = require("morgan");
const path = require("path");
require("dotenv").config();
const indexRouter = require("./routes/index");
const fileRouter = require("./routes/file");
const userRouter = require("./routes/user");
const folderRouter = require("./routes/folder");
const shareRouter = require("./routes/share");
const session = require("express-session");
const passportConfig = require("./passportConfig/passportConfig");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const favicon = require("serve-favicon");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const port = process.env.PORT || 3000;
const app = express();
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'"],
    },
  })
);
app.use(compression());

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const sessionConfig = {
  cookie: { maxAge: 1000 * 3600 },
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(client, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionConfig.cookie.secure = true;
}

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "/public/images", "favicon.ico")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(session(sessionConfig));
app.use(passportConfig.session());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/files", fileRouter);
app.use("/users", userRouter);
app.use("/folders", folderRouter);
app.use("/share", shareRouter);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
