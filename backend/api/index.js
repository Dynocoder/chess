import express from 'express';
export const router = express.Router();

router.get('/', (req, res) => {
  res.send('henlo!');
});

router.get('/availablity', (req, res) => {
  res.send('nothing found');
});

// router.get('/connect')
