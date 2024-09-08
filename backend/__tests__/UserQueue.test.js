import UserQueue from "../controllers/UserQueue";

test("UserQueue", () => {

  let uq = new UserQueue();

  uq.push(5);
  uq.push(7);
  uq.push(9);

  expect(uq.length).toEqual(3);

  expect(uq.pop()).toEqual(5);
  expect(uq.length).toEqual(2);

  expect(uq.peek()).toEqual(7);
  expect(uq.length).toEqual(2);


  expect(uq.pop()).toEqual(7);
  expect(uq.pop()).toEqual(9);

  expect(uq.length).toEqual(0);

  expect(uq.pop()).toEqual(undefined);

  uq.push(3);
  expect(uq.length).toEqual(1);


})
