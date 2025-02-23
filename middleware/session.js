import pgsSession from 'connect-pg-simple';
import session from 'express-session';

import config from '../config/index.js';
import pgPool from '../database/config/pool.js';

const PgSessionStore = pgsSession(session);
const store = new PgSessionStore({ pool: pgPool });

const sessionMiddleware = session({
  store: store,
  secret: config.session_secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.environment === 'production' ? true : false,
    sameSite: 'strict',
  },
});

export default sessionMiddleware;
