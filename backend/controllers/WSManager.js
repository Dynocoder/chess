import WebSocket, { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";
import GamesController from "./GamesController.js";
import { Server } from "http";

export default class WSManager {

  userList = [];
  messageType = {
    'GetInitialState': 1,
  }

  /**
   * Purpose is to manage websocket connection
   * - add/delete user from the userList
   * - start Game - Multiplayer/api
   * - close connection
   * @param {WebSocket.Server} wss
   * @param {GamesController} gc - gameController object.
   */
  constructor(gc) {
    this.gc = gc
    // this.wss = wss;
  }


  /**
   * @param {WebSocket} ws - the websocket client to add.
   * @param {User} user
   */
  addUser(ws) {
    const user = {
      id: uuid(),
      ws: ws
    }
    this.gc.enqueueForLookup(user);
  }

  /**
  * @param {User} user
  * @param {User[]} userList
  */
  removeUser(user, userList) {
  }


  /**
   * Creates a new WebSocketServer Instance with the passed http server attached.
   * @param {Server} server
   */
  createWebSocketServer(server) {

    this.wss = new WebSocketServer({ server: server, clientTracking: true });

    this.wss.on('connection', (ws, request) => {
      // TODO: send the uuid back to the client.
      this.addUser(ws);
      ws.on('message', (data) => {
        console.log(`[server]: received -> ${data}`)
        ws.send(data)
      })
    })


    this.wss.on('close', (ws, request) => {

    })
  }


  /**
  * start multiplayer game search for the user
  * @param {User} user
  */
  startMultiplayerSearch(user) {
  }


  /**
   * @param {WebSocket} ws - the Websocket to subscribe to events for.
   * @param {import("express").Request} request - request parameters.
   */
  connectionSubscriber(ws, request) {
    //TODO: implement logic
  }

  /**
  * send the initial board state when all pieces are in their initial position
  * @param {WebSocket} ws - the websocket object to send the board state to.
  */
  sendInitialBoardState(ws) {
    // const board = "RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr";
    const board = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const d = {
      "messageType": 1,
      "board": board
    }
    ws.send(JSON.stringify(d));
  }
}
