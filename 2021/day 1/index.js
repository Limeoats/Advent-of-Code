const fs = require("fs");

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 1/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\n').map((n) => {
                return parseInt(n);
            });
            // Part 1
            let increased = 0;
            for (let i = 1; i < arr.length; ++i) {
                if (Number(arr[i]) > Number(arr[i - 1])) {
                    ++increased;
                }
            }
            const part1Answer = increased;
            // resolve(part1Answer);
            
            // Part 2
            increased = 0;
            let previousSum = 0;
            for (let i = 0; i < arr.length - 2; ++i) {
                let sum = 0;
                for (let j = i; j < i + 3; ++j) {
                    sum += arr[j];
                }
                if (i == 0) {
                    previousSum = sum;
                    continue;
                }
                if (sum > previousSum) {
                    ++increased;
                }
                previousSum = sum;
                continue;
            }
            const part2Answer = increased;
            resolve(increased);
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

