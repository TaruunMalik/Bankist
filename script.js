"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2022-05-07T21:31:17.178Z",
    "2022-04-08T07:42:02.383Z",
    "2022-07-09T09:15:04.904Z",
    "2022-08-10T10:17:24.185Z",
    "2022-08-11T14:11:59.604Z",
    "2022-08-12T17:01:17.194Z",
    "2022-09-13T23:36:17.929Z",
    "2022-09-14T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-GB", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2022-05-07T21:31:17.178Z",
    "2022-04-08T07:42:02.383Z",
    "2022-07-09T09:15:04.904Z",
    "2022-08-10T10:17:24.185Z",
    "2022-08-11T14:11:59.604Z",
    "2022-08-12T17:01:17.194Z",
    "2022-09-13T23:36:17.929Z",
    "2022-09-14T10:51:36.790Z",
  ],
  locale: "en-GB",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-09-15T12:01:20.894Z",
  ],
  locale: "hi-IN",
};

const account5 = {
  owner: "Ayuushmaan Malik",
  movements: [3000, 1000, 7000, 1150, 390],
  interestRate: 0.2,
  pin: 5555,
  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-09-15T12:01:20.894Z",
  ],
  locale: "hi-IN",
};

const accounts = [account1, account2, account3, account4, account5];

// Elements

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 24 * 60 * 60));
  const todays = new Date();
  const daysPassed = calcDaysPassed(todays, date);

  if (daysPassed === 1) {
    return "Today";
  }
  if (daysPassed === 2) {
    return "Yesterday";
  }
  if (daysPassed == 3) {
    return "2 days ago";
  }
  if (daysPassed == 4) {
    return "3 days ago";
  }
  if (daysPassed == 5) {
    return "4 days ago";
  }
  if (daysPassed == 6) {
    return "5 days ago";
  }
  if (daysPassed == 7) {
    return "6 days ago";
  }
  // if (daysPassed == 7) {
  //   return "one week ago";
  // }

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const startLogOutTimer = function () {
  const tickTick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    // when time =0 break and log out
    if (time === 0) {
      clearInterval(timerBank);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // 5 minute timer
  let time = 300;

  // Call the timer every second
  tickTick();
  const timerBank = setInterval(tickTick, 1000);
  return timerBank;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const move = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  move.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate} </div>
    <div class="movements__value">${mov.toFixed(2)} ₹</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// const displayDate = function () {
//   const todayDate = new Date();
//   labelDate.textContent = todayDate.toLocaleString();

// };

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance.toFixed(2)} ₹`;
};

const calcDisplaySummary = function (acc) {
  const incomes = Math.floor(
    acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0)
  );

  labelSumIn.textContent = `${incomes} ₹`;

  const out = Math.round(
    acc.movements
      .filter((mov) => mov < 0)
      .map((mov) => mov * -1)
      .reduce((acc, cur) => acc + cur, 0)
  );

  labelSumOut.textContent = `${out} $ `;

  const interest = Math.round(
    acc.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * acc.interestRate) / 100)
      .filter((int, i, arr) => int >= 1)
      .reduce((acc, cur) => acc + cur, 0)
  );

  labelSumInterest.textContent = `${interest} ₹`;
};
// calcDisplaySummary(account1.movements);

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsername(accounts);
// console.log(accounts);

// Event Handlers
let currentAccount, timer;

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
  const todayDate = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(todayDate);
  // labelDate.textContent = todayDate.toDateString();
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  const nowDate = new Date();

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movementsDates.push(nowDate.toDateString());
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(nowDate.toDateString());
    // Update UI
    updateUI(currentAccount);

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amountLoan = Math.floor(inputLoanAmount.value);

  const nowDate = new Date();

  if (
    amountLoan > 0 &&
    currentAccount.movements.some((mov) => mov > 0.1 * amountLoan)
  ) {
    setTimeout(function () {
      currentAccount.movementsDates.push(nowDate.toDateString());
      currentAccount.movements.push(amountLoan);
      // loanCounter = loanCounter + 1;
      updateUI(currentAccount);
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 5000);
  } else {
    alert(`You are not Eligible for the loan of ${amountLoan} Rs.`);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    inputClosePin.value = inputCloseUsername.value = "";
    labelWelcome.textContent = "Login to get started.";
    containerApp.style.opacity = 0;
    alert(`Have A Good Day and GoodBye, ${currentAccount.owner}`);
  }
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  clearInterval(timer);
  timer = startLogOutTimer();
});
labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = "#AAC4FF";
    }
  });
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
*/
/////////////////////////////////////////////////
//slice
// let arr = ["a", "b", "c", "d", "e"];

// console.log(arr.slice(2));

//splice
// console.log(arr.splice(-1));//mutates the array
// console.log(arr);

//reverse
// arr = ["a", "b", "c", "d"];
// const arr2 = ["j", "o", "k", "y"];
// console.log(arr2.reverse());//mutates the array
// console.log(arr2);

// concat
// const letters = arr.concat(arr2); //does not mutate
// console.log(letters);

// join
// console.log(letters.join(" - "));

//at method
// const arr = [23, 11, 64];
// console.log(arr.at(1));

// getting the last element
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`your dep ${movement}`);
//   }
// }
// var mmm = movements.filter((i) => {
//   if (i > 10) {
//     return i;
//   }
// });

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`at position ${i + 1} you did ${movement} `);
//   } else {
//     console.log(`at position ${i + 1} you withdrew ${movement}`);
//   }
// }

// for each does not allow break statements
// console.log("------------------------");
// movements.forEach((mov, i, arr) => {
//   if (mov > 0) {
//     console.log(`at position ${i + 1} you did ${mov} `);
//   } else {
//     console.log(`at position ${i + 1} you withdrew ${mov}`);
//   }
// });

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(`${key} : ${value}`);
// });

// const currencySet = new Set(["USD", "INR", "EUR", "INR", "GBP", "GBP"]);

// currencySet.forEach((key) => {
//   console.log(`${key}`);
// });
// const user = "Steven Bhai Will";
// const username = user
//   .toLowerCase()
//   .split(" ")
//   .map((name) => name[0])
//   .join("");
// console.log(username);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposits);
// const withdrawals = movements.filter((mov) => mov < 0);

// console.log(withdrawals);

// const balance = movements.reduce(function (acc, cur,i,arr) {
//   return acc + cur;
// }, 0);
// console.log(balance);

// // maximum value
// const max = movements.reduce((acc,cur)=>{
//   if(acc>cur){
//     return acc;
//   }else{
//     return cur;
//   }
// });

// Challenge 2::

// const calcAverageHumanAge = function (ages) {
// const humanAgeArr = ages.map((dogAge) => {
// if (dogAge <= 2) {
//       const humanAge = 2 * dogAge;
//       return humanAge;
//     } else {
//       const humanAge = 16 + dogAge * 4;
//       return humanAge;
//     }
//   });
//   console.log(humanAgeArr);

//   const humanAgeArrFiltered = humanAgeArr.filter((humanAge2) => {
//     return humanAge2 > 18;
//   });
//   console.log(humanAgeArrFiltered);

//   const humanAgeAverage = humanAgeArrFiltered.reduce(
//     (acc, cur) => acc + cur / humanAgeArrFiltered.length
//   );
//   return humanAgeAverage;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// const eurToUsd = 1.1;

// const totalDepositsUsd = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * eurToUsd)
//   .reduce((acc, cur) => acc + cur, 0);

// console.log(totalDepositsUsd);

// movements.find((mov) => mov < 0); //returns the first element of the array when the condition becomes true
// returns only one element

// const bankDeposit = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov > 0)
//   .reduce((acc, cur) => acc + cur);
// console.log(bankDeposit);

// // 2.
// const numDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

// // 3.
// const numDeposits100 = accounts
//   .flatMap((acc) => acc.movements)
// .filter((num) => num >= 1000).length;

// 4.
// const sum = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(sum);

// 5.
// this is a nice title
// const convertTitle = function (title) {
//   const exceptions = ["an", "a", "the", "but", "or"];

//   const titleCase = title
//     .toLowerCase()
//     .split(" ")
//     .map((letter) =>
//       exceptions.includes(letter)
//         ? letter
//         : letter[0].toUpperCase() + letter.slice(1)
//     )
//     .join(" ");
//   return titleCase;
// };

// console.log(convertTitle("this is a nice title"));

// const dogs = [
//   { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
//   {
//     weight: 8,
//     curFood: 200,
//     owners: ["Matilda"],
//   },
//   {
//     weight: 13,
//     curFood: 275,
//     owners: ["Sarah", "John"],
//   },
// ];

// dogs.forEach((dog) => (dog.recommendedFood = dog.weight ** 0.75 * 28));
// // const sarah = dogs.find((dog) => dog.owners.includes("Sarah"));
// const overEatingDog = dogs
//   .filter((dog) => dog.curFood > dog.recommendedFood)
//   .map((dog) => dog.owners);
// const underEatingDog = dogs
//   .filter((dog) => dog.curFood > dog.recommendedFood)
//   .map((dog) => dog.owners);
// console.log(`${overEatingDog.flat().join(" and ")}'s dogs eat too much`);
// console.log(`${underEatingDog.flat().join(" and ")}'s dogs eat too less`);

// LECTURES 2
// console.log(23 === 23.0);

// PARSING
// console.log(Number.parseInt("30px", 10)); // Base 10 numbers: 0 to 10 numericals
// console.log(Number.parseInt("3rem"));
// console.log(Number.parseFloat("2.5px"));
// console.log(Number.isNaN(20));
// console.log(Number.isNaN("20"));
// console.log(Number.isNaN(+"jfdjfi"));
// console.log(Number.isSafeInteger(9007199254740991));
// console.log(Number.isNaN(23 / 0));
// console.log(Number.isFinite(20));
// console.log(Number.isInteger(23.01));

// console.log(Math.cbrt(27));
// console.log(Math.max(2, 3, Number.parseInt("23px"), 11));

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1);
// console.log(randomInt(8, 10));

// console.log((2.7).toFixed(0));
// console.log(2.35);

// Numeric Separators

//  Create a date
// const now = new Date();
// console.log(now);

// console.log(new Date("2019-11-01T13:15:33.035Z"));

// Working with dates
// const future = new Date(2037, 10, 19, 21, 34);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getMonth());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.toISOString());
// console.log(future.toDateString());
// future.setFullYear(2022);
// console.log(future);
