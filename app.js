import express from 'express';

import config from './config/index.js';
import logger from './logging/logger.js';

async function startServer() {
  const app = express();

  const loaders = await import('./loaders/index.js');
  await loaders.default(app);

  app.listen(config.port, () =>
    logger.info(`Server running on port: ${config.port}`),
  );
}

startServer();

// Bring table manipulation and storage of message with posts of users and so on.
// Add input validation across all important routes
