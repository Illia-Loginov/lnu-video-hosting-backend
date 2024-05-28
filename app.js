import express from 'express';
import healthcheckRouter from './routes/healthcheck.routes.js';
import filesRouter from './routes/files.routes.js';
import cors from 'cors';
import { corsOptions } from './config/server.config.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/healthcheck', healthcheckRouter);
app.use('/files', filesRouter);

export default app;
