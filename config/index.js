import dotenv from 'dotenv';

dotenv.config();

export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  logs: {
    level: process.env.LOG_LEVEL,
  },
  admin_username: process.env.ADMIN_NAME,
  admin_pwd: process.env.ADMIN_PWD,
};
