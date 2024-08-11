import express from 'express';
import { Server } from '../bin/serverState.js';
export const router = express.Router();


router.get('/', (req, res) => {
  res.send('henlo!');
});

router.get('/availablity', (req, res) => {

})


