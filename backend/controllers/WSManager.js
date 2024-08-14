import WebSocket from "ws";
import { v4 as uuid } from "uuid";

export default class WSManager {

  userList = [];

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

      // TODO: based on the request, process as PvP or PvC;
      console.log(request);



      // TODO: return the ws object for future event subscription.


    })
  }

}
