import { WebSocket } from "ws";

export class TestWebSocket extends WebSocket {

  /**
   * @type {string[]}*/
  #messages = [];

  /** @param {ConstructorParameters<typeof WebSocket>} args */
  constructor(...args) {
    super(...args);

    /** @param {import("ws").MessageEvent} event */
    const addNewMessage = (event) => {
      this.#messages.push(event.data.toString('utf8'));
    }

    this.addEventListener('message', addNewMessage);
    this.addEventListener('close', () => this.removeEventListener('message', addNewMessage));
  }


  /**
  * @param {'open' | 'close'} state 
  * @param {number} [timeout]
  * @returns {void | Promise<void>}
  */
  waitUntil(state, timeout = 1000) {
    if (this.readyState === this.OPEN && state === 'open') return;
    if (this.readyState === this.CLOSED && state === 'close') return;

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
        if (this.readyState === this.CLOSED && state === 'close') return resolve();

        reject(new Error(`WebSocket did not resolve state '${state}' in time, timeout=${timeout}`));
      }, timeout);
    })
  }


  /**
   * Remove all the messages stored in {@link #messages}
   */
  clearMessages() {
    this.#messages.splice(0, this.#messages.length-1);
  }


  /**
  * Wait for the client to receive a particular message.
  * @param {string} message
  * @param {boolean} [includePreviousMessages]
  * @param {number} [timeout]
  * @returns {Promise<boolean>} - true if the message matches a new message, false otherwise.
  */
  waitForMessage(message, includePreviousMessages = false, timeout=1000) {
    if (includePreviousMessages && this.#messages.includes(message)) return;
    const lastMessageIndex = this.#messages.lastIndexOf(message);

    return new Promise((resolve, reject) => {
      let timer;

      /** @type {import("ws").MessageEvent} event */
      const handleMessageEvent = (event) => {
        if (event.data.toString('utf8') !== message) return resolve(false);

        resolve(true);
        clearTimeout(timer);
        this.removeEventListener('message', handleMessageEvent);
      }

      this.addEventListener('message', handleMessageEvent);

      timer = setTimeout(() => {
        this.removeEventListener('message', handleMessageEvent);
        let success = includePreviousMessages ? 
          this.#messages.includes(message) : 
          this.#messages.lastIndexOf(message) > lastMessageIndex;


        if (success) {
          return resolve(true);
        }
        else {
          return resolve(false);
        }
      }, timeout);
    })
  }
}
