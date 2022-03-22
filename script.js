'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>

    <div class="movements__value">${mov}€ </div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// calculate balance

const calPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} €`;
};

//computing names

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);
console.log(accounts);

// display summary
const calDisplaySummary = function (acc) {
  // in
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  // out
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => {
      return acc + int;
    }, 0);

  labelSumInterest.textContent = `${interest}€`;
};

// update ui function
const updateUi = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calPrintBalance(acc);
  // Display summary
  calDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    // update ui
    updateUi(currentAccount);
  }
});

// transfer

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // update ui
    updateUi(currentAccount);
  }
});

// loan feature
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // update ui
    updateUi(currentAccount);
  }

  inputLoanAmount.value = '';
});

// close account button
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    console.log(index);
    // delete account
    accounts.splice(index, 1);

    // hide ui
    containerApp.style.opacity = 0;
  }
  inputTransferAmount.value = inputTransferTo.value = '';
});

// sorting feature

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault;
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// // 1 simple array methods

// // 1 slice
// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(1));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -1));
// console.log(arr.slice());
// console.log([...arr]);

// // 2 splice
// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // 3 Reverse
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // 4 concat
// const letters = arr.concat(arr2);
// console.log(letters);

// console.log([...arr, ...arr2]);

// // 5 join
// console.log(arr.join('-'));

// // 2 the new "at" method
// const arr3 = [23, 11, 64];
// console.log(arr3[0]);
// console.log(arr3.at(0));

// // getting last array element
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);
// console.log(arr3.at(-1));

// console.log('jonas'.at(-1));

// 3  looping array : for each

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of movements)
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`movement ${i + 1} you desposited ${movement}`);
//   } else {
//     console.log(`movement ${i + 1} you withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('for each');

// movements.forEach(function (movement, i, arr) {
//   if (movement > 0) {
//     console.log(`movement ${i + 1} you desposited ${movement}`);
//   } else {
//     console.log(`movement ${i + 1} you withdrew ${Math.abs(movement)}`);
//   }
// });

// // 4 for each with maps and sets

// // maps
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// // sets
// const currenciesUnique = new Set(['usd', 'gbp', 'eur', 'eur']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, _, set) {
//   console.log(`${value} : ${value}`);
// });

// //4 the map method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// const movementUsd = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// // with arrow function
// // const movementUsd = movements.map(mov => {
// //   return mov * eurToUsd;
// // });

// console.log(movements);
// console.log(movementUsd);

// const movementUsdFor = [];
// for (const mov of movements) {
//   movementUsdFor.push(mov * eurToUsd);
// }
// console.log(movementUsdFor);

// // EXAMPLE
// const movementDescription = movements.map((mov, i, arr) => {
//   // if (mov > 0) {
//   //   return `movement ${i + 1} you desposited ${mov}`;
//   // } else {
//   //   return `movement ${i + 1} you withdrew ${Math.abs(mov)}`;
//   // }
//   return `movement ${i + 1} you ${
//     mov > 0 ? 'deposited' : 'withdraw'
//   } ${Math.abs(mov)}`;
// });

// console.log(movementDescription);

// //  5  filter method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposit = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposit);

// //with forof loop
// const depositFor = [];
// for (const move of movements) {
//   if (move > 0) {
//     depositFor.push(move);
//   }
// }
// console.log(depositFor);

// //example

// const withdrawal = movements.filter(function (moves) {
//   return moves < 0;
// });

// console.log(withdrawal);

// // 6 The reduce method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const balance = movements.reduce(function (acc, current, i, arr) {
//   console.log(`iterations ${i}, ${acc}`);
//   return acc + current;
// }, 0);

// console.log(balance);

// // with for of loop
// let balance2 = 0;
// for (const mov of movements) {
//   balance2 += mov;
// }

// console.log(balance2);

// //maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) {
//     return acc;
//   } else return mov;
// } movement[0]);

// console.log(max);

// 7 the magic of chaining method
const eurToUsd = 1.1;

// pipeline
const totalDepositUsd = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUsd);

// 8  find method
const firstWithdrawl = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawl);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// 10 some and every
// equality
console.log(movements);
console.log(movements.includes(-130));

// condition
console.log(movements.some(mov => mov === -130));
const anyDeposit = movements.some(mov => mov > 1500);
console.log(anyDeposit);

// Every
console.log(movements.every(mov => mov > 0));

// separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// 11 flat and flatmap

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [[5, 6]]];
console.log(arrDeep.flat());

// flat
const overalBalance = accounts
  .map(mov => mov.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance);

// flatmap
const overalBalance2 = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance2);

// 12 shorting arrays

//string
const owners = ['jonas', 'ram', 'komal', 'sahil'];
console.log(owners.sort());

//numbers

// return < 0 a, b
//return > 0 b, a

// asscending order

// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// another solution
movements.sort((a, b) => a - b);

console.log(movements);

// decending order

movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

// another solution
movements.sort((a, b) => b - a);

console.log(movements);

// more ways of creating and filling arrays
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//empty Arrays + fill method
const x = new Array(12);
// console.log(x);
// console.log(x.map(() => 5));

x.fill(1, 3, 10);
console.log(x);

//array from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);

console.log(z);

labelBalance.addEventListener('click', function () {
  const movementUi = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementUi);
});
