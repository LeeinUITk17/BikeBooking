const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/booking/user.model');
const bcrypt = require('bcrypt');

const verifyPassword = async (password, user) => {
     return await bcrypt.compare(password, user.password);
}

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
    //  console.log(user);
     // return;
      if (!user || !await verifyPassword(password,user)) {
        console.log('error 1');
        return done(null, false, { message: 'Incorrect username or password' });
      }
     // console.log(user);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
module.exports=passport;