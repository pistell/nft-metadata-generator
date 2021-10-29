// Follow me on twitter @JamesPistell

// Access the File System via Node's fs module
const fs = require('fs');


//* ************************************************** //
//* **************** Metadata Attributes ************* //
//* ************************************************** //
// Create metadata for a person (hair, eye, height, etc)
const hairColor = [
  ['Black hair', 10],
  ['Redhead', 1],
  ['Brunette', 40],
  ['Blonde', 5]
];

const eyeColor = [
  ['Brown eyes', 70],
  ['Blue eyes', 10],
  ['Hazel eyes', 5],
  ['Amber eyes', 5],
  ['Gray eyes', 3],
  ['Green eyes', 2]
];

const height = [
  ['Average height', 80],
  ['Tall as fuck', 10],
  ['Short', 10]
];

const bodyType = [
  ['Average Body', 70],
  ['Thin', 10],
  ['Slim', 10],
  ['Fat fuck', 10],
  ['Jacked as fuck', 5]
];

const penisSize = [
  ['Average dong', 80],
  ['Gigantic', 2],
  ['Pathetic', 5]
];

// random number based on a range of 1-100
// Math.floor(Math.random() * 100 + 1)
// Leave as undefined for now because the value will be filled out in the loop below
let age = undefined;

const disease = [
  ['Healthy', 70],
  ['AIDS', 5],
  ['Herpes', 15],
  ['Chlamydia', 15],
  ['Scurvy', 23],
  ['Twitter addict', 10]
];


//* ************************************************** //
//* **************** Weighted Randomizer ************* //
//* ************************************************** //
// Randomize the array and chose a value based on weights
// https://blobfolio.com/2019/randomizing-weighted-choices-in-javascript/
function randomWeight(arr) {
  // Pre-sum the weights
  // First, we loop the main dataset to count up the total weight.
  // We're starting the counter at one because the upper boundary
  // of Math.random() is exclusive.
  let total = 0;
  for (let index = 0; index < arr.length; ++index) {
    total += arr[index][1];
  }
  // Total in hand, we can now pick a random value akin to our
  // random index from before.
  const threshold = Math.random() * total;

  // Now we just need to loop through the main arr one more time
  // until we discover which value would live within this
  // particular threshold. We need to keep a running count of
  // weights as we go, so let's just reuse the "total" variable
  // since it was already declared.
  total = 0;
  for (let index = 0; index < arr.length; ++index) {
    // Add the weight to our running total.
    total += arr[index][1];
    // If this value falls within the threshold, we're done!
    if (total >= threshold) {
      return arr[index][0];
    }
  }
  return arr[arr.length - 1][0];
}


//* ************************************************** //
//* ********** Create the JSON metadata file ********* //
//* ************************************************** //
for (let index = 0; index < 15; index++) {

  let personData = {
    hairColor: randomWeight(hairColor),
    eyeColor: randomWeight(eyeColor),
    height: randomWeight(height),
    bodyType: randomWeight(bodyType),
    penisSize: randomWeight(penisSize),
    age: Math.floor(Math.random() * 100 + 1),
    disease: randomWeight(disease)
  };

  // lets output this data to JSON!!!!!!!
  fs.writeFileSync(`./metadata/${index}.json`, JSON.stringify(personData, null, 2));
}


//* ************************************************** //
//* ********** Validate your rarity DATA ************* //
//* ************************************************** //
const emptyArr = [];
const counts = {};

for (let index = 1; index < 8888; index++) {
  // Pick a random attribute array to find how how many are going to be generated
  // In this example I am analyzing eyeColor
  emptyArr.push(randomWeight(eyeColor));
}

// view the total number of each attribute generated
emptyArr.forEach((x) => {
  let totalNum = (counts[x] || 0) + 1;
  counts[x] = totalNum;
});

console.log('================= TOTAL COUNT =================');
console.log(counts);

// view the total percentage of each attribute generated
Object.entries(counts).forEach((e) => {
  counts[e[0]] = `${((e[1] / 8888) * 100).toFixed(2)}%`;
});

console.log('================= TOTAL PERCENTAGE =================');
console.log(counts);
