import { WebSocketServer } from 'ws';
import { app } from '../app.js';
import WSManager from '../controllers/WSManager.js';

const PORT = process.env.PORT ?? 3000;
export const wss = new WebSocketServer({ noServer: true, clientTracking: true });


const wsm = new WSManager(wss);

// starting the http server.
export const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// subscribing to server upgrade event.
server.on('upgrade', (request, socket, head) => {
  console.log("[server]: upgraded");
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  })
})

