const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
import { env } from './server.config.js';

const dbConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME
};

if (env === 'production') {
  dbConfig.ssl = {
    rejectUnauthorized: false
  };
}

export default dbConfig;
