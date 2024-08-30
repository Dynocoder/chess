import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketControllerService } from '../../services/web-socket-controller.service';
import { Coords, FENChar, FENCharReverseMapping, pieceImagePath } from '../../models/model';


export enum MessageType {
  InitialMessage = 1,
  UpdateMove = 2
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit, AfterViewInit, OnDestroy {

  private playingBlack!: boolean;
  private selected!: Coords | null;
  private _chessBoardView: Array<Array<string>> = new Array<Array<string>>;
  private _initialMessageReceived!: boolean;

  get chessBoardView(): Array<Array<string>> { return this._chessBoardView; }

  constructor(
    private wsc: WebSocketControllerService
  ) {
    this.playingBlack = false;
    this._initialMessageReceived = false;
  }


  ngOnInit(): void {
    this.wsc.startConnection('ws://localhost:3000');

    let messageFn = (data: MessageEvent<any>) => {
      const dataRecieved = JSON.parse(data.data);
      if (dataRecieved.messageType === MessageType.InitialMessage && !this._initialMessageReceived) {

        console.log(JSON.parse(data.data));
        this._initialMessageReceived = true;
        this._chessBoardView = this.FENChartoBoardView(dataRecieved.board);
        console.log(`board: ${this._chessBoardView}`);
      }

    }


    this.wsc.stateSubscriber(messageFn);

  }

  ngAfterViewInit(): void {
    const initalState = {
      messageType: 2
    }
  }

  ngOnDestroy(): void {
    this.wsc.closeConnection();
  }

  pingServer(): void {
  }

  FENChartoBoardView(board: string): Array<Array<string>> {
    let boardView: Array<Array<string>> = new Array<Array<string>>;
    let row: Array<string> = new Array<string>;

    for (let i = 0; i <= board.length; i++) {

      if (board[i] === '/' || i === board.length) {
        boardView.push(row);
        row = []
        i++;
      }

      if (Number(board[i])) {
        for (let j = 0; j < Number(board[i]); j++) {
          row.push('');
        }
      }

      else {
        row.push(board[i]);
      }
    }

    return boardView;
  }

  isDarkSquare(x: number, y: number): boolean {
    if (this.playingBlack) {
      return (x + y) % 2 === 0;
    }
    else {
      return (x + y) % 2 !== 0;
    }
  }

  getPiecePath(x: number, y: number): string | null {
    let path = pieceImagePath[this._chessBoardView[x][y]];
    if (path) {
      return path;
    }
    return null;
  }

  triggerSelection(x: number, y: number): void {
    this.selected = { x, y } as Coords;
  }

  isSelected(x: number, y: number): boolean {
    if (this.selected) {
      if (this.selected.x === x && this.selected.y === y) {
        return true;
      }
    }
    return false;
  }

}
