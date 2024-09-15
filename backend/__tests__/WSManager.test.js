import WSManager from "../controllers/WSManager.js";
import GamesController from "../controllers/GamesController.js";
import http, { createServer } from 'http';
import { startServer } from "../bin/start.js";
import { TestWebSocket } from "../controllers/TestWebSocket.js";

describe("WSManager tests", () => {
  let wsm, gc, server, port;
  gc = new GamesController();
  wsm = new WSManager(gc);

  beforeAll(async () => {
    port = 5000;
    server = new createServer();

    // starts the HTTP server from testUtils
    // TODO: check if we need to await this.
    await startServer(port).then(({ server, port }) => {
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
    await user.waitUntil('close');

  });

  it('add and remove user from queue', async () => {

    expect(wsm.userList.size).toBe(0);
    const user = new TestWebSocket(`ws://localhost:${port}`);

    await user.waitUntil('open');
    expect(wsm.userList.size).toBe(1);


    // Remove the user by closing the connection.
    user.close();
    await user.waitUntil('close');

    expect(wsm.userList.size).toBe(0);
  });


  it('Add User to game object when lookupQueue.size > 1', async () => {
    gc.clearQueue();
    wsm.clearUserList();
    gc.clearGames();
    expect(wsm.userList.size).toBe(0);

    const userA = new TestWebSocket(`ws://localhost:${port}`);
    await userA.waitUntil('open');
    expect(wsm.userList.size).toBe(1);
    expect(gc.games.length).toBe(0);
    expect(gc.lookupQueue.length).toBe(1);

    const userB = new TestWebSocket(`ws://localhost:${port}`);
    await userB.waitUntil('open');
    expect(wsm.userList.size).toBe(2);
    expect(gc.lookupQueue.length).toBe(0);
    expect(gc.games.length).toBe(1);

  });

  it('game started when userCount = 2', async () => {
    const userA = new TestWebSocket(`ws://localhost:${port}`);
    await userA.waitUntil('open');
    userA.clearMessages();
    const userB = new TestWebSocket(`ws://localhost:${port}`);
    userB.clearMessages();
    await userB.waitUntil('open');
    const a = {
      "messageType": 1,
      "playerColor": 'white',
      "board": "RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr"
    }

    let ra = await userA.waitForMessage(JSON.stringify(a), true);
    let rb = await userB.waitForMessage(JSON.stringify(a), true);
    let result = [ra, rb];

    expect(result).toContain(true);
    expect(result).toContain(false);
  });

  afterAll(() => {
    // TODO: close out the wss
    server.close();
  })

})
