export default class UserQueue {
  constructor() {
    this.items = {}
    this.head = this.tail = undefined;
    this.length = 0;
  }


  /**
  * @param {User} user - User to add to the UserQueue.
  */
  push(user) {
    if (this.length === 0) {
      this.head = this.tail = 0
    }
    else {
      this.tail++;
    }

    this.items[this.tail] = user;
    this.length++;
  }

  /**
  * @returns {User} user
  */
  pop() {
    if (this.head !== undefined) {
      this.length--;
      const item = this.items[this.head];
      delete this.items[this.head]
      if (this.head < this.tail && this.length !== 0) {
        this.head++;
      }
      else {
        this.head = this.tail = undefined;
      }
      return item;
    }
  }


  /**
  * @returns {User} user
  */
  peek() {
    if (this.head) {
      return this.items[this.head]
    }
    return undefined;
  }
}
