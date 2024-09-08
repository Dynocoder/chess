import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WebSocketControllerService {

  private _socket!: WebSocket;

  get socket(): WebSocket { return this._socket; }

  constructor() { }

  /**
   * Starts a new Websocket connection.
   * @param URL {string}
   * @returns {WebSocket} - the websocket instance opened.
  */
  startConnection(URL: string): WebSocket {
    this._socket = new WebSocket(URL)

    setTimeout(() => {
      this._socket.send("{}asdfasfasdfaf");
    }, 1000);

    return this._socket;
  }


  closeConnection(): void {
    this._socket.close()
  }


  /*
  * Subscribes to Websocket events.
  */
  stateSubscriber(message: (data: any) => void, error?: () => void, close?: () => void, open?: () => void): void {
    this._socket.onmessage = message;
    this._socket.onopen = open ?? null;
    this._socket.onerror = error ?? null;
    this._socket.onclose = close ?? null;
  }


}
