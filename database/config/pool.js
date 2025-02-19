import pg from 'pg';

import config from '../../config/index.js';

const { Pool } = pg;

export default new Pool({ connectionString: config.databaseUrl });
