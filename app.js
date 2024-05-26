import express from 'express';
import { query } from './db.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Ok');
});

app.post('/test-files', async (req, res) => {
  try {
    const { rows } = await query('INSERT INTO test_files (title) VALUES ($1)', [
      req.body.title
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default app;
