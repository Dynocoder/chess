import { resolve } from "path";
import { WebSocket } from "ws";

export class TestWebSocket extends WebSocket {


  /**
  * @param {'open' | 'closed'} state 
  * @param {number} [timeout]
  * @returns {void | Promise<void>}
  */
  waitUntil(state, timeout = 1000) {
    if (this.readyState === this.OPEN && state === 'open') return;
    if (this.readyState === this.CLOSED && state === 'closed') return;

    return new Promise((resolve, reject) => {
      let timer;
      const handleStateEvent = () => {
        resolve();
        clearTimeout(timer);
      }

      this.addEventListener(state, handleStateEvent, { once: true });

      timer = setTimeout(() => {
        this.removeEventListener(state, handleStateEvent);
        if (this.readyState === this.OPEN && state === 'open') return resolve();
        if (this.readyState === this.CLOSED && state === 'closed') return resolve();

        reject(new Error(`WebSocket did not resolve state '${state}' in time, timeout=${timeout}`));
      }, timeout);
    })
  }
}




