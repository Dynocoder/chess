import { wss } from "../bin/start";



wss.on('connection', (ws, request) => {
  console.log('connection is made');
  console.log(ws);
});


