import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import userService from '../services/userService.js';

const configurePassport = (app) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const userData = await userService.findUserByUsername(username);
        const match = await bcrypt.compare(password, userData.password);

        if (!userData || !match) {
          return done(null, false, {
            message: 'Incorrect username or password',
          });
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
      process.nextTick(() => done(null, user));
    } catch (error) {
      done(error);
    }
  });
};

export default configurePassport;
