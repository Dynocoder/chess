import UserQueue from "../controllers/UserQueue";

class User {
  constructor(name) {
    this.name = name;
  }
}

describe('UserQueue', () => {
  let queue;

  beforeEach(() => {
    queue = new UserQueue();
  });

  test('should start with an empty queue', () => {
    expect(queue.length).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });

  test('should push a user and increase the length', () => {
    const user1 = new User('Alice');
    queue.push(user1);
    expect(queue.length).toBe(1);
    expect(queue.peek()).toBe(user1);
  });

  test('should push multiple users and maintain correct order', () => {
    const user1 = new User('Alice');
    const user2 = new User('Bob');
    queue.push(user1);
    queue.push(user2);
    expect(queue.length).toBe(2);
    expect(queue.peek()).toBe(user1); // Alice should be first
  });

  test('should pop users in the correct order', () => {
    const user1 = new User('Alice');
    const user2 = new User('Bob');
    queue.push(user1);
    queue.push(user2);

    expect(queue.pop()).toBe(user1); // Pop Alice first
    expect(queue.length).toBe(1);
    expect(queue.peek()).toBe(user2); // Bob should be next
    expect(queue.pop()).toBe(user2); // Pop Bob next
    expect(queue.length).toBe(0);
    expect(queue.pop()).toBeUndefined(); // Popping an empty queue returns undefined
  });

  test('should handle popping from an empty queue', () => {
    expect(queue.pop()).toBeUndefined();
  });

  test('should handle peeking from an empty queue', () => {
    expect(queue.peek()).toBeUndefined();
  });

  test('should reset head and tail after all users are popped', () => {
    const user1 = new User('Alice');
    const user2 = new User('Bob');
    queue.push(user1);
    queue.push(user2);

    queue.pop(); // Pop Alice
    queue.pop(); // Pop Bob

    expect(queue.length).toBe(0);
    expect(queue.head).toBeUndefined(); // Head should be reset
    expect(queue.tail).toBeUndefined(); // Tail should be reset
  });

  test('should handle a large number of users', () => {
    const numUsers = 1000;
    const users = Array.from({ length: numUsers }, (_, i) => new User(`User${i + 1}`));

    users.forEach(user => queue.push(user));
    expect(queue.length).toBe(numUsers);

    users.forEach(user => {
      expect(queue.pop()).toBe(user); // Ensure correct order
    });

    expect(queue.length).toBe(0);
    expect(queue.pop()).toBeUndefined(); // No more users to pop
  });

  test('should handle pushing and popping in alternating fashion', () => {
    const user1 = new User('Alice');
    const user2 = new User('Bob');
    const user3 = new User('Charlie');

    queue.push(user1);
    expect(queue.pop()).toBe(user1); // Pop immediately after push

    queue.push(user2);
    queue.push(user3);
    expect(queue.pop()).toBe(user2);
    expect(queue.pop()).toBe(user3);
    expect(queue.length).toBe(0);
  });

  test('should not break when popping after head > tail', () => {
    const user1 = new User('Alice');
    const user2 = new User('Bob');
    queue.push(user1);
    queue.push(user2);

    expect(queue.pop()).toBe(user1);
    expect(queue.pop()).toBe(user2);
    expect(queue.pop()).toBeUndefined(); // No more users to pop, head should be reset
  });
});

