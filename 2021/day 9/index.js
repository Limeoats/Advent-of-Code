const fs = require("fs");

const data = fs.readFileSync("day 9/data.txt", { encoding: "utf-8" }).split("\r\n").map((str) => {
    return str.split("").map((a) => {
        
    });
});

let lowest_array = [];

for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i].length; ++j) {
        const n = data[i][j];
        let lowest = true;
        if (j > 0) {
            // Look left
            if (n >= Number(data[i][j - 1])) {
                lowest = false;
            }
        }
        if (i > 0) {
            // Look up
            if (n >= Number(data[i - 1][j])) {
                lowest = false;
            }
        }
        if (j < data[i].length - 1) {
            // Look right
            if (n >= Number(data[i][j + 1])) {
                lowest = false;
            }
        }
        if (i < data.length - 1) {
            // Look down
            if (n >= Number(data[i + 1][j])) {
                lowest = false;
            }
        }

        if (lowest) {
            lowest_array.push(Number(n));
        }

    }
}

let sum = lowest_array.reduce((prev, curr) => {
    return prev + curr + 1;
}, 0);

console.log(sum);