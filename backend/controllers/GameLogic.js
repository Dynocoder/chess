import { v4 as uuid } from "uuid";

export default class GameLogic {

  /**
   * @private
   * @type{Player}
   */
  playerA = {};

  /**
   * @private
   * @type {Player} 
   */
  playerB = {};

  /**
   * @private
   * @type {string}
   */
  id;

  /**
   * GameLogic Class that implements game logic and board state.
  * @param {User} userA
  * @param {User} userB
  */
  constructor(userA, userB) {
    this.id = uuid();
    this.playerA.user = userA;
    this.playerB.user = userB;
    this.assignColors();
  }

  /**
   * Method to start the game
   */
  initiate() {
    this.sendInitialBoardDetails();
  }

  /**
   * @param {'a' | 'b'} playerTag
   * @returns {'white' | 'black'}
  */
  getColor(playerTag) {
    if (playerTag === 'a') {
      return this.playerA.playerColor;
    }
    else if (playerTag === 'b') {
      return this.playerB.playerColor;
    }
  }


  /**
   * @private
   */
  assignColors() {
    const i = Number(Math.random());
    if (i >= 0.5) {
      this.playerA.playerColor = 'black';
      this.playerB.playerColor = 'white';
    }
    else {
      this.playerA.playerColor = 'white';
      this.playerB.playerColor = 'black';
    }
  }

  /**
   * @private
   */
  sendInitialBoardDetails() {
   const boardA = "RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr";
    const boardB = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const a = {
      "messageType": 1,
      "playerColor": this.playerA.playerColor,
      "board": "RNBKQBNR/PPPPPPPP/8/8/8/8/pppppppp/rnbkqbnr"
    }

    const b = {
      "messageType": 1,
      "playerColor": this.playerB.playerColor,
      "board": boardB
    }
    this.playerA.user.ws.send(JSON.stringify(a));
    this.playerB.user.ws.send(JSON.stringify(b));
  }
}
