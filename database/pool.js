import pg from 'pg';
const { Pool } = pg;

import config from '../config/index.js';

export default new Pool({ connectionString: config.databaseUrl });
