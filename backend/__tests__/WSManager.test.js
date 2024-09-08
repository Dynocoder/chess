import { WebSocket, WebSocketServer } from "ws";
import WSManager from "../controllers/WSManager.js";
import GamesController from "../controllers/GamesController.js";
import http, { createServer } from 'http';
// import { startServer } from "../controllers/WebSocketTestUtils";
import { startServer, testing } from "../bin/start.js";
import { app } from '../app.js';
import { TestWebSocket } from "../controllers/TestWebSocket.js";

describe("WSManager tests", () => {
  let wsm, gc, server, port;
  gc = new GamesController();
  wsm = new WSManager(gc);

  beforeAll(() => {
    port = 5000;
    server = new createServer();

    // starts the HTTP server from testUtils
    startServer(port).then(({ server, port }) => {
      console.log(`[testing]: Listening at port: ${port}`);
      wsm.createWebSocketServer(server);
    })
  })


  it('Mock http get request', async () => {

    await new Promise((resolve) => {
      const re = http.get(`http://localhost:${port}/`, (res) => {
        return resolve(res.statusCode)
      })
    }).then((code) => {
      expect(code).toBe(200);
    })

  })

  it('Mock http to Websocket upgrade', async () => {
    const user = new TestWebSocket(`ws://localhost:${port}`)

    await user.waitUntil('open');
    const testMessage = "this is a test message";

    const responseMessage = await new Promise((resolve) => {
      user.addEventListener('message', ({ data }) => resolve(data.toString('utf-8')), { once: true });

      user.send(testMessage);
    });

    expect(responseMessage).toBe(testMessage);


    user.close();
    await user.waitUntil('closed');

  });

  it('addUser: add to queue', async () => {


    const user = new TestWebSocket(`ws://localhost:${port}`);

    expect(gc.lookupQueue.length).toBe(0);
    await user.waitUntil('open');
    expect(gc.lookupQueue.length).toBe(1);



  });
  it.todo('user added to GameInitiator if 0 >= userCount <= 1');
  it.todo('game started when userCount = 2');
  it.todo('game object added to running games with a uuid')
  it.todo('send the initial game state to respective players');

  afterAll(() => {
    // wss.close();
    server.close();
  })

})
