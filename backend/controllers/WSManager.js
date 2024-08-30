import WebSocket from "ws";
import { v4 as uuid } from "uuid";

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
   */
  constructor(wss) {
    this.wss = wss;
    this.connectionSubscriber(wss);
  }


  /**
   * @param {User} user
   * @param {User[]} userList
   */
  addUser(user, userList) {
  }

  /**
  * @param {User} user
  * @param {User[]} userList
  */
  removeUser(user, userList) {
  }


  /**
  * start multiplayer game search for the user
  * @param {User} user
  */
  startMultiplayerSearch(user) {
  }


  /**
  * subscribes to the connection event
  * @param {WebSocket.Server} wss
  */
  connectionSubscriber(wss) {
    wss.on('connection', (ws, request) => {
      /**
       * @type {User}
       */
      let user = {
        id: uuid(),
        ws: ws
      }


      // TODO: return the ws object for future event subscription.
      ws.on('message', (data) => {
        console.log(`[user]: ${JSON.parse(data)}`);
      })

      ws.on('close', (data) => {
        console.log(`[server]: the connection was closed`);
      })

      // setInterval(() => {
      //   ws.send("pinging from the server")
      // }, 2000);


      this.sendInitialBoardState(ws);
    })

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
