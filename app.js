import express from 'express';
import healthcheckRouter from './routes/healthcheck.routes.js';
import filesRouter from './routes/files.routes.js';

const app = express();

app.use(express.json());

app.use('/healthcheck', healthcheckRouter);
app.use('/files', filesRouter);

export default app;
