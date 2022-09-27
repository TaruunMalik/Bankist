"use strict";
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// SOME: CHECKS FOR ALL THE ELEMENTS BUT RETURNS TRUE IF EVEN ONE OF IT SATISFIES THE CONDITION
// const anyDep = movements.some((mov) => mov > 0);
// console.log(anyDep);

// EVERY: CHECKS FOR EVERY ELEMENT AS IS EVIDENT BY THE NAME OF THE METHOD
// console.log(movements.every((mov) => mov > 0));

// const arr = [[[1, 2], 3], [4, 5, 6], 7, 8];
// console.log(arr.flat(3));

// movements.sort((a, b) => {
//   if (a > b) {
//     return 1; a-b
//   }
//   if (b > a) {
//     return -1; b-a
//   }
// });
// console.log(movements);

// const x = new Array(6);
// x.fill(1, 2, 5);

// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const a = Array.from({length:5}, (cur,i)=>i+1);
// console.log(a);

// dice generated random numbers
// const r = Array.from(
//   { length: 100 },
//   (_, i) => (i = Math.trunc(Math.random() * 6 + 1))
// );
// console.log(r);

// const todayDate = new Date();
// todayDate.toTimeString();
// console.log(todayDate.toLocaleString());

// const future = new Date(2037, 10, 19, 15, 20);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 24 * 60 * 60);

// const daysPassed = calcDaysPassed(new Date(2021, 1, 25), new Date(2022, 1, 25));
// console.log(daysPassed);

// setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   "liver"
// );
// console.log("Waiting...");

setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = `${now.getMinutes()}`.padStart(2, 0);
  const seconds = `${now.getSeconds()}`.padStart(2, 0);

  console.log(`${hours}:${minutes}:${seconds}`);
}, 1000);
