// // Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// // about their dog's age, and stored the data into an array (one array for each). For
// // now, they are just interested in knowing whether a dog is an adult or a puppy.
// // A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// // old.
// // Your tasks:
// // Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// // ('dogsJulia' and 'dogsKate'), and does the following things:
// // 1. Julia found out that the owners of the first and the last two dogs actually have
// // cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// // ages from that copied array (because it's a bad practice to mutate function
// // parameters)
// // 2. Create an array with both Julia's (corrected) and Kate's data
// // 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// // is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// // �
// // ")
// // 4. Run the function for both test datasets
// // Test data:
// // § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// // § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// // Hints: Use tools from all lectures in this section so far �

// //1
// const originalJuliaDog = [3, 5, 2, 12, 7];
// const juliaDogNew = originalJuliaDog;

// const juliaDog = juliaDogNew.slice(1, -2);

// console.log(juliaDog);
// //2

// const kateDogs = [4, 1, 15, 8, 3];

// //3
// const checkDogAge = function (checkAge) {
//   checkAge.forEach(function (dogsAge, i) {
//     if (dogsAge > 3) {
//       console.log(
//         `Dog number ${i + 1} is an adult, and is ${dogsAge} years old`
//       );
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy`);
//     }
//   });
// };

// checkDogAge(juliaDog);

// // challenge 2

// //1
// const calAverageHumanAge = function (ages) {
//   const humanAges = ages.map(function (age) {
//     return age <= 2 ? 2 * age : 16 + age * 4;
//   });
//   console.log(humanAges);

//   //2
//   const adults = humanAges.filter(age => age >= 18);
//   console.log(adults);

//   //3
//   //   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

//   const average = adults.reduce(function (acc, age, i, arr) {
//     return acc + age / arr.length;
//   }, 0);

//   return average;
// };

// const average1 = calAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const average2 = calAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(average1);
// console.log(average2);
