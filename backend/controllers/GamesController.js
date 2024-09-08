import { lookup } from "dns";
import UserQueue from "./UserQueue.js";


export default class GamesController {

  /**
  * GamesController Object that manages the following properties of games
  * - Maintaining ongoing Games list.
  * - Maintaining lookup queue.
  */
  constructor() {
    this.games = [];
    this.lookupQueue = new UserQueue();
  }


  /**
  * @param {User} user
  */
  enqueueForLookup(user) {
    this.lookupQueue.push(user);
  }


  clearQueue() {
    for (let i = 0; i < this.lookupQueue.length; i++) {
      this.lookupQueue.pop();
    }
  }

}
