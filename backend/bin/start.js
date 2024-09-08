import { WebSocketServer } from 'ws';
import { app } from '../app.js';
import WSManager from '../controllers/WSManager.js';
import GamesController from '../controllers/GamesController.js';

const PORT = process.env.PORT ?? 3000;


const gc = new GamesController();
const wsm = new WSManager(gc);

export function startServer(port) {
  return new Promise((resolve) => {
    const server = app.listen(port, () => resolve({ server, port }));
  })
}

startServer(PORT).then(({ server, port }) => {
  console.log(`Listening on port ${port}`);
  wsm.createWebSocketServer(server);
});
