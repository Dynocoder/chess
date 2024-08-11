import express from 'express';
import logger from 'morgan';
import { router } from './api/index.js';

export const app = express();

app.use(logger('dev'));
app.use('/api', router);


