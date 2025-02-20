import compression from 'compression';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import routes from '../api/index.js';
import errorHandler from '../middleware/errorHandler.js';
import helmet from '../middleware/helmet.js';
import notFoundHandler from '../middleware/notFoundHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function expressLoader(app) {
  // Compression
  app.use(compression());

  // Security headers
  app.use(helmet);

  // Render host reverse proxy
  app.set('trust proxy', 1);

  // Default middleware setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // View engine setup
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs');

  // Load all routes
  app.use('/', routes);

  // 404
  app.use(notFoundHandler);

  // Error hanlder
  app.use(errorHandler);
}
