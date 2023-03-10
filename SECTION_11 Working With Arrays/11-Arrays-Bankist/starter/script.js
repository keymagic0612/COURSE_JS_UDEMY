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
  //. textContent = 0;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}???</div>
  </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// const user = 'Steven Thomas Williams';

const calcDisplayPrinBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}???`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}???`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}???`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}???`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
const updateUI = function (acc) {
  // Display movements
  displayMovements(currentAccount.movements);

  // Display balance
  calcDisplayPrinBalance(currentAccount);

  // Display summary
  calcDisplaySummary(currentAccount);
};

// Event handle
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form form submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.vlaue = '';

  if (
    amount > 0 &&
    // receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI

    updateUI(currentAccount);
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add movement

    currentAccount.movements.push(amount);

    //Update UI

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// EX :142. Simple Array Methods

/* 
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE : g???i v??? tr?? ph???n t??? trong m???ng
console.log(arr);
console.log(arr.slice(2)); //Array(3) [ "c", "d", "e" ]
console.log(arr.slice(2, 4));

console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE : x??a ph???n t??? g???i
console.log(arr.splice(2)); // Array(3) [ "c", "d", "e" ]
console.log(arr.splice(1, 2));
arr.splice(-1);
console.log(arr);

// REVERSE : ?????o ng?????c m???ng ban ?????u
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());
console.log(arr2);

// CONCAT : n???i m???ng
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join('-'));

*/
/////////////////////////////////

// LECTURES
/*
EX 143. The new at Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////////

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));
console.log(arr[arr.length-1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log('jonas'.at(-2));

*/

/*
///////////////////////
EX : 144. Looping Arrays: forEach
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i+1} : You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1} : You withdrew ${Math.abs(movement)}`);
  }
}
console.log('=== FOREACH ===');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i+1} : You deposited ${mov}`);
  } else {
    console.log(`Movement ${i+1} : You deposited ${Math.abs(mov)}`);
  }
  console.log(arr);
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
//...
**/

////////////////////////////
/*
// EX : 145 : forEach with Maps and Sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set

const currenciesUnique = new Set(['USD','GBP','USD','USD','EUR','EUR']);

console.log(currenciesUnique);
currenciesUnique.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
  // console.log(map); 
});

*/
// EX 146. PROJECT: "Bankist" App

//148:  Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia ph??t hi???n ra r???ng ch??? c???a hai con ch?? ?????U TI??N v?? HAI con ch?? CU???I C??NG th???c s??? nu??i m??o ch??? kh??ng ph???i ch??! V?? v???y, h??y t???o m???t b???n sao n??ng c???a m???ng c???a Julia v?? x??a tu???i m??o kh???i m???ng ???? sao ch??p ???? (v?? ???? l?? m???t c??ch l??m kh??ng t???t ????? thay ?????i c??c tham s??? h??m)
2. T???o m???t m???ng c?? c??? d??? li???u c???a Julia (???? s???a) v?? Kate
3. ?????i v???i m???i con ch?? c??n l???i, h??y ????ng nh???p v??o b???ng ??i???u khi???n xem ???? l?? ch?? tr?????ng th??nh ("Ch?? s??? 1 l?? ng?????i l???n v?? 5 tu???i") hay ch?? con ("Ch?? s??? 2 v???n l?? ch?? con ????")
4. Ch???y h??m cho c??? hai b??? d??? li???u th??? nghi???m

HINT: Use tools from all lectures in this section so far ????

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK ????
*/
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  // console.log(dogsJuliaCorrected);
  dogsJuliaCorrected.splice(-2);
const dogs = dogsJuliaCorrected.concat(dogsKate);
console.log(dogs);
  dogs.forEach(function(dog, i){
    if(dog >= 3){
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    }else{
      console.log(`Dog number ${i + 1} is still a puppy ????`);
    }
  })
};
checkDogs([3, 4, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/////////////////////////////////
// EX : 150 : Map Methor
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => {
  mov * eurToUsd;
});

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i) => {
  return `Movement ${i + 1} : You ${
    mov > 0 ? 'deposited' : 'withdrew'
  } ${Math.abs(mov)}`;
});

console.log(movementsDescriptions);
*/
/*

EX 152.The filter methor
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/
////////////////////////////////////
/*
153. The reduce Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// accumulator -> SNOWBALL
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value 
const max = movements.reduce((acc, mov) => {
  if(acc > mov)
  return acc;
  else
  return mov;
}, movements[0]);

console.log(max);

*/

///////////////////////////////////////
// Coding Challenge #2

/* 
H??y quay l???i nghi??n c???u c???a Julia v?? Kate v??? ch??. L???n n??y, h??? mu???n chuy???n ?????i tu???i c???a ch?? sang tu???i c???a con ng?????i v?? t??nh tu???i trung b??nh c???a nh???ng con ch?? trong nghi??n c???u c???a h???.

T???o m???t h??m 'calcAverageHumanAge', ch???p nh???n m???t m???ng tu???i c???a ch?? ('ages') v?? th???c hi???n c??c vi???c sau theo th??? t???:

1. T??nh tu???i c???a ch?? theo n??m c???a con ng?????i b???ng c??ng th???c sau: n???u ch?? <= 2 tu???i, humanAge = 2 * dogAge. N???u ch?? > 2 tu???i, HumanAge = 16 + dogAge * 4.
2. Lo???i tr??? t???t c??? nh???ng con ch?? d?????i 18 tu???i c???a con ng?????i (gi???ng nh?? gi??? nh???ng con ch?? ??t nh???t 18 tu???i)
3. T??nh tu???i trung b??nh c???a con ng?????i cho t???t c??? ch?? tr?????ng th??nh (b???n h???n ???? bi???t t??? c??c th??? th??ch kh??c v??? c??ch ch??ng t??i t??nh tu???i trung b??nh ????)
4. Ch???y h??m cho c??? hai b??? d??? li???u th??? nghi???m

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK ????
*/

/*

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);
const eurToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Vi???t l???i h??m 'calcAverageHumanAge' t??? th??? th??ch tr?????c, nh??ng l???n n??y l?? h??m m??i t??n v?? s??? d???ng chu???i!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK ????
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

// const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);

//   return average;
// };
/*
const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(avg1, avg2);

*/

/////////////////////////
// EX 157 find methor
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0)

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

*/
////////////////////////////////
/*

161 : every and some
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME :CONDITION : set ph???n t??? (boolean)
console.log(movements.some(mov => mov === -400));

const anyDeposits = movements.some(mov => mov > 1000);
console.log(anyDeposits);

// EVERY : set c??? m???ng(boolean)

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/
/*
///////////////////////
EX : 162. flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overaBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overaBalance);

// flat 
const overalBanlance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overaBalance);
// flatMap
const overalBanlance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overaBalance);

*/
/////////////////////////////
/*
// 163 : Sorting Array 
// Strings
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

console.log(movements);

// return < 0 , A, B
// return > 0 , B, A
movements.sort((a, b) => a - b);
console.log(movements);
movements.sort((a, b) => b - a);
console.log(movements);
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log(movements);

*/
//////////////////////////////////////
// Coding Challenge #4
/*
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
//Emprty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5))

x.fill(1, 3, 5);
x.fill(1);
console.log(x);

// Array from

const y = Array.from({ length: 7 }, () => 1);
console.log(y);
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));

console.log(movementsUI);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('???',''))
  );
  console.log(movementsUI);
 
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];


});
*/

///////////////////////////////////////
// Array Methods Practice
/*
// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);
2;

const numDeposits10001 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits10001);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;

      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;

      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);
console.log('////////////////////////////////////');
//4.
// this is a nice title -> this is a Nice Title
const convertTitleCase = function (title) {
  const captizalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', ' in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : captizalize(word)))
    .join(' '); // t??ch chu???i th??nh 1 m???ng
  return captizalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

//////////////////////////////////////
// Th??? th??ch l???p tr??nh #4

/*
Julia v?? Kate v???n ??ang nghi??n c???u v??? ch??, v?? l???n n??y h??? ??ang nghi??n c???u xem ch?? ??n qu?? nhi???u hay qu?? ??t.
??n qu?? nhi???u c?? ngh??a l?? kh???u ph???n th???c ??n hi???n t???i c???a ch?? l???n h??n kh???u ph???n khuy???n ngh???, c??n ??n qu?? ??t th?? ng?????c l???i.
??n m???t l?????ng v???a ph???i c?? ngh??a l?? kh???u ph???n th???c ??n hi???n t???i c???a ch?? n???m trong ph???m vi tr??n 10% v?? d?????i 10% so v???i kh???u ph???n khuy???n ngh??? (xem g???i ??).

1. L???p l???i m???ng ch???a c??c ?????i t?????ng con ch?? v?? ?????i v???i m???i con ch??, h??y t??nh to??n ph???n th???c ??n ???????c khuy???n ngh??? v?? th??m n?? v??o ?????i t?????ng d?????i d???ng m???t thu???c t??nh m???i. KH??NG t???o m???t m???ng m???i, ch??? c???n l???p qua m???ng. Di???n ????n: khuy???n ngh???Th???c ph???m = tr???ng l?????ng ** 0,75 * 28. (K???t qu??? t??nh b???ng gam th???c ph???m v?? tr???ng l?????ng c???n t??nh b???ng kg)
2. T??m con ch?? c???a Sarah v?? ????ng nh???p v??o b???ng ??i???u khi???n xem n?? ??n qu?? nhi???u hay qu?? ??t. G???I ??: M???t s??? con ch?? c?? nhi???u ch???, v?? v???y tr?????c ti??n b???n c???n t??m Sarah trong m???ng ch??? s??? h???u, v?? v???y ph???n n??y h??i ph???c t???p (c?? m???c ????ch) ????
3. T???o m???t m???ng ch???a t???t c??? ch??? s??? h???u c???a nh???ng con ch?? ??n qu?? nhi???u ('ownersEatTooMuch') v?? m???t m???ng g???m t???t c??? ch??? s??? h???u c???a nh???ng con ch?? ??n qu?? ??t ('ownersEatTooLittle').
4. Ghi m???t chu???i v??o b???ng ??i???u khi???n cho m???i m???ng ???????c t???o trong 3., nh?? sau: "Matilda and Alice and Bob's dogs eat too much!" v?? "Ch?? c???a Sarah, John v?? Michael ??n qu?? ??t!"
5. ????ng nh???p v??o b???ng ??i???u khi???n xem c?? con ch?? n??o ??n CH??NH X??C l?????ng th???c ??n ???????c khuy???n ngh??? hay kh??ng (????ng ho???c sai)
6. ????ng nh???p v??o b???ng ??i???u khi???n xem c?? con ch?? n??o ??n m???t l?????ng th???c ??n OK kh??ng (ch??? ????ng ho???c sai)
7. T???o m???t m???ng ch???a nh???ng con ch?? ??ang ??n m???t l?????ng th???c ??n OK (c??? g???ng s??? d???ng l???i ??i???u ki???n ???????c s??? d???ng trong 6.)
8. T???o m???t b???n sao n??ng c???a m???ng dogs v?? s???p x???p n?? theo ph???n th???c ??n ???????c khuy???n ngh??? theo th??? t??? t??ng d???n (h??y nh??? r???ng c??c ph???n n???m b??n trong c??c ?????i t?????ng c???a m???ng)

G???I ?? 1: S??? d???ng nhi???u c??ng c??? kh??c nhau ????? gi???i quy???t nh???ng th??ch th???c n??y, b???n c?? th??? s??? d???ng b??i gi???ng t??m t???t ????? l???a ch???n gi???a ch??ng ????
G???I ?? 2: N???m trong ph???m vi 10% tr??n v?? d?????i ph???n ???????c khuy???n ngh??? c?? ngh??a l??: hi???n t???i > (???????c khuy???n ngh??? * 0,90) && hi???n t???i < (???????c khuy???n ngh??? * 1,10). V??? c?? b???n, ph???n hi???n t???i ph???i n???m trong kho???ng t??? 90% ?????n 110% so v???i ph???n khuy???n ngh???.

D??? LI???U TH??? NGHI???M:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

CH??C MAY M???N ????
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
dogs.forEach(dog => (dog.reFood = Math.trunc(dog.weight ** 0.75 * 28)));
// console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.reFood ? 'much' : 'little'
  }`
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.reFood)
  .flatMap(dog => dog.owners);
// .flat()
console.log(ownersEatTooMuch);

const ownersEatTooLitte = dogs
  .filter(dog => dog.curFood < dog.reFood)
  .flatMap(dog => dog.owners);
// .flat()
console.log(ownersEatTooLitte);

// 4.
// "Matilda and Alice and Bob's dogs eat too much!"
//  "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join('and')}'s dogs eat too much!`);
console.log(`${ownersEatTooMuch.join('and')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.reFood));

// 6.
//hi???n t???i > (???????c khuy???n ngh??? * 0,90) && hi???n t???i < (???????c khuy???n ngh??? * 1,10). V??? c?? b???n, ph???n hi???n t???i ph???i n???m trong kho???ng t??? 90% ?????n 110% so v???i ph???n khuy???n ngh???.

const checkEatingOkay = dog =>
  dog.curFood > dog.reFood * 0.9 && dog.curFood < dog.reFood * 1.1;
console.log(dogs.some(checkEatingOkay));
console.log(dogs.some(checkEatingOkay));
// 7.
console.log(dogs.filter(checkEatingOkay));
//8.

const dogsCopy = dogs.slice().sort((a, b) => a.reFood - b.reFood);

console.log(dogsCopy);
