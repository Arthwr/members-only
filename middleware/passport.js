import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import config from '../config/index.js';
import userService from '../services/userService.js';

const configurePassport = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const userData = await userService.findUserByUsername(username);
        const hashedPassword = userData ? userData.password : config.dummy_pwd;

        const match = await bcrypt.compare(password, hashedPassword);

        if (!userData || !match) {
          return done(null, false);
        }

        return done(null, userData);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    process.nextTick(() => done(null, user.id));
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.findUserById(id);

      if (!user) {
        return done(null, false);
      }

      process.nextTick(() => done(null, user));
    } catch (error) {
      done(error, null);
    }
  });
};

export default configurePassport;
