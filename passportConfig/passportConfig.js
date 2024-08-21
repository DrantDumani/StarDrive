const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const client = require("../prisma/client");

const verify = async (email, password, done) => {
  try {
    const user = await client.users.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return done(null, false, { message: "No user found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

const strategy = new LocalStrategy({ usernameField: "email" }, verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await client.users.findUnique({
      where: {
        id: id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
