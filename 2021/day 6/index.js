const fs = require("fs");

const data = fs.readFileSync("day 6/input.txt", { encoding: "utf-8" });

const fish = data.split(",").map((c) => {
  return Number(c);
});

let items = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};
let newItems = JSON.parse(JSON.stringify(items));

fish.forEach((c) => {
  items[c]++;
});

for (let day = 0; day < 256; ++day) {
  for (let a = 8; a >= 0; --a) {
    const d = items[a];

    if (a == 0) {
      newItems[6] += items[a];
      newItems[8] += items[a];
    } else {
      newItems[a - 1] = d;
    }
  }

  items = JSON.parse(JSON.stringify(newItems));

  // Reset each day
  for (let i = 0; i < 9; ++i) {
    newItems[i] = 0;
  }
}

// Calculate the total
let total = 0;
for (let i = 0; i < 9; ++i) {
  total += items[i];
}

console.log(total);
