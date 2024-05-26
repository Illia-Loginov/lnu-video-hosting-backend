import pg from 'pg';
const { Pool } = pg;
import dbConfig from './config/db.config.js';

const pool = new Pool(dbConfig);

export const query = (text, params) => pool.query(text, params);
