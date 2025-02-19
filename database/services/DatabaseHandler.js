import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pool from '../pool.js';
import logger from '../../utils/logger.js';
import { AppError } from '../../utils/Errors.js';

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
        error
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
        error
      );
    }
  }

  static async _withTransaction(client, callback) {
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

  static async initializeDatabase() {
    const fileName = 'create_tables.sql';
    const client = await pool.connect();

    try {
      await this._withTransaction(client, async () => {
        const sql = await this._getSqlQuery(fileName);
        await this._query(client, sql, []);
      });
      logger.info('Database tables created successfully.');
    } catch (error) {
      logger.error(`Database initialization failed:`, {
        message: error.message,
        stack: error.stack,
      });
    }
  }
}
