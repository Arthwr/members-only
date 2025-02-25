import compression from 'compression';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import passport from 'passport';

import routes from '../api/index.js';
import errorHandler from '../middleware/errorHandler.js';
import helmetMiddleware from '../middleware/helmet.js';
import notFoundHandler from '../middleware/notFoundHandler.js';
import configurePassport from '../middleware/passport.js';
import sessionMiddleware from '../middleware/session.js';
import clientUtils from '../utils/clientUtils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function expressLoader(app) {
  // Render host reverse proxy
  app.set('trust proxy', 1);

  // Compression
  app.use(compression());

  // Security headers
  app.use(helmetMiddleware);

  // Static
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Deny browser errors on favicon requests
  app.use((req, res, next) => {
    if (req.path === '/favicon.ico') {
      return res.status(204).end();
    }
    next();
  });

  // Body parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session
  app.use(sessionMiddleware);

  // Passport session support
  app.use(passport.session());

  // Passport strategy, serialization and deserialization
  configurePassport();

  // View engine setup
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');

  // Util functions
  app.locals.utils = clientUtils;

  // Load all routes
  app.use('/', routes);

  // 404
  app.use(notFoundHandler);

  // Error hanlder
  app.use(errorHandler);
}
