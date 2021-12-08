const fs = require("fs");

const data = fs.readFileSync("day 7/input.txt", { encoding: "utf-8" });

const positions = data.split(",").map(c => Number(c));

let least = Number.MAX_SAFE_INTEGER;
const maxPos = Math.max(...positions);
for (let i = 0; i < maxPos; ++i) {
    let total = 0;
    for (let j = 0; j < positions.length; ++j) {
        let tmp = 0;
        let amt = Math.abs(i - positions[j]);
        for (let k = 1; k <= amt; ++k) {
            tmp += k;
            total += k;
        }
    }
    if (total < least) least = total;
}

console.log(least);