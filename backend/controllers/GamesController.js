import { lookup } from "dns";
import UserQueue from "./UserQueue.js";
import GameLogic from "./GameLogic.js";


export default class GamesController {

  /**
  * GamesController Object that manages the following properties of games
  * - Maintaining ongoing Games list.
  * - Maintaining lookup queue.
  */
  constructor() {
    /** @type {User[]} */
    this.games = [];
    this.lookupQueue = new UserQueue();
  }


  /**
  * @param {User} user
  */
  enqueueForLookup(user) {
    // TODO: add logic to verify if the user is still connected.
    this.lookupQueue.push(user);
    this.checkForMatch();
  }

  clearQueue() {
    while (this.lookupQueue.length != 0) {
      this.lookupQueue.pop();
    }
  }
  clearGames() {
    this.games = [];
  }


  /** @private */
  checkForMatch() {
    if (this.lookupQueue.length > 1) {
      //can start match
      let userA = this.lookupQueue.pop();
      let userB = this.lookupQueue.pop();
      if (userA && userB) {
        let game = new GameLogic(userA, userB);
        this.games.push(game);
        game.initiate();
      }
      else {
        throw new Error(`User: ${userB ? userA : userB} is not defined.`);
      }
    }
  }



}
