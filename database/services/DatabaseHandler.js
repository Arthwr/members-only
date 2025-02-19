import bcrypt from 'bcryptjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import config from '../../config/index.js';
import { AppError } from '../../utils/Errors.js';
import logger from '../../utils/logger.js';
import pool from '../config/pool.js';

export default class DatabaseHandler {
  static async _getSqlQuery(sqlRelativePath) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, '../queries', sqlRelativePath);

    try {
      const sql = await fs.readFile(filePath, { encoding: 'utf-8' });

      return sql.trim();
    } catch (error) {
      throw new AppError(
        'Error reading SQL file',
        {
          status: 500,
          type: 'DatabaseError',
          meta: { filePath },
        },
        error,
      );
    }
  }

  static async _query(client, sqlQuery, params) {
    try {
      logger.info('DB: executing query', { sql: sqlQuery, params });
      const result = await client.query(sqlQuery, params);

      return result.rows;
    } catch (error) {
      throw new AppError(
        'Error during query execution',
        {
          status: 500,
          type: 'DatabaseError',
          meta: { sqlQuery, params },
        },
        error,
      );
    }
  }

  static async _withClient(callback) {
    const client = await pool.connect();

    try {
      return await callback(client);
    } finally {
      client.release();
    }
  }

  static async _withTransaction(callback) {
    const client = await pool.connect();

    try {
      logger.info('DB: starting transaction.');

      await client.query('BEGIN');
      const result = await callback(client);

      await client.query('COMMIT');
      logger.info('DB: transaction completed successfully.');

      return result;
    } catch (error) {
      logger.error(`DB: transaction failed, rolling back`, {
        message: error.message,
        stack: error.stack,
      });

      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
      logger.info('DB: client connection released.');
    }
  }

  static async _adminExists(client) {
    const fileName = 'get_admin_exists.sql';
    const sql = await this._getSqlQuery(fileName);

    const result = await this._query(client, sql, [
      config.admin_username,
      true,
    ]);

    return result[0].exists;
  }

  static async _createTables(client) {
    const fileName = 'create_tables.sql';
    const sql = await this._getSqlQuery(fileName);

    await this._query(client, sql, []);
  }

  static async _addAdmin(client, username, password) {
    const fileName = 'add_admin.sql';

    const sql = await this._getSqlQuery(fileName);
    const hash = await bcrypt.hash(password, 10);

    await this._query(client, sql, [username, hash, true]);
  }

  static async addUser(username, password) {
    return this._withClient(async (client) => {
      const fileName = 'add_user.sql';

      const sql = await this._getSqlQuery(fileName);
      const hash = await bcrypt.hash(password, 10);

      await this._query(client, sql, [username, hash]);
    });
  }

  static async userExists(username) {
    return this._withClient(async (client) => {
      const fileName = 'get_user_exists.sql';

      const sql = await this._getSqlQuery(fileName);
      const result = await this._query(client, sql, [username]);

      return result[0].exists;
    });
  }

  static async initializeDatabase() {
    try {
      return this._withTransaction(async (txClient) => {
        await this._createTables(txClient);

        const adminExists = await this._adminExists(txClient);

        if (!adminExists) {
          logger.info('Creating admin user...');
          await this._addAdmin(
            txClient,
            config.admin_username,
            config.admin_pwd,
          );
          logger.info('Admin user created successfully.');
        } else {
          logger.info('Admin user already exists, skipping creation.');
        }

        logger.info('Database tables created successfully.');
      });
    } catch (error) {
      logger.error('Database initialization failed');
    }
  }
}
