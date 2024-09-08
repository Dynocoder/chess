import express from 'express';
import logger from 'morgan';
import { router } from './api/index.js';
import dotenv from 'dotenv';

dotenv.config();
export const app = express();


// app.use(express.json({}));
app.use(logger('dev'));
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('asdfasdfasdf');
})

export { dotenv };

/**
 * @type {string}
 */
let name;

/**
 * @param {number} value
 */
function setName(value) {
  name = value
}
