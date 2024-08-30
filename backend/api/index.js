import express from 'express';
import cors from 'cors';
export const router = express.Router();

const corsConfig = {
  origin: "*",
  optionSuccessStatus: 200
}

router.get('/', (req, res) => {
  res.send('henlo!');
});

router.get('/availablity', cors(corsConfig), (req, res) => {
  console.log(req.ip);
  res.json("{'test': 'testing'}");
});

router.get('/api/availablity', (req, res) => {
  console.log(req.ip);
  res.json("{'test': 'testing'}");
});
// router.get('/connect')
