const fs = require("fs");

const data = fs.readFileSync("day 9/data.txt", { encoding: "utf-8" }).split("\r\n").map((str, col) => {
    return str.split("").map((s, row) => {
        return {
            number: Number(s),
            col: row,
            row: col,
            done: false,
        };
    });
});

let lowest_array = [];

for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i].length; ++j) {
        const n = data[i][j].number;
        let lowest = true;
        if (j > 0) {
            // Look left
            if (n >= Number(data[i][j - 1].number)) {
                lowest = false;
            }
        }
        if (i > 0) {
            // Look up
            if (n >= Number(data[i - 1][j].number)) {
                lowest = false;
            }
        }
        if (j < data[i].length - 1) {
            // Look right
            if (n >= Number(data[i][j + 1].number)) {
                lowest = false;
            }
        }
        if (i < data.length - 1) {
            // Look down
            if (n >= Number(data[i + 1][j].number)) {
                lowest = false;
            }
        }

        if (lowest) {
            const val = {
                number: Number(n),
                col: j,
                row: i,
            };
            lowest_array.push(val);
        }

    }
}

// let sum = lowest_array.reduce((prev, curr) => {
//     return prev + curr.number + 1;
// }, 0);

//console.log(sum);
let size = 0;
function f(n) {
    // Move in each direction
    // Move left
    n.done = true;
    if (n.col > 0) {
        const v = data[n.row][n.col - 1];
        if (!v.done) {
            const num = data[n.row][n.col - 1].number;
            if (num !== 9) {
                ++size;
                f(data[n.row][n.col - 1]);
            }
        }
    }
    // Move up
    if (n.row > 0) {
        const v = data[n.row - 1][n.col];
        if (!v.done) {
            const num = data[n.row - 1][n.col].number;
            if (num !== 9) {
                ++size;
                f(data[n.row - 1][n.col]);
            }
        }
    }
    // Move right
    if (n.col < data[n.row].length - 1) {
        const v = data[n.row][n.col + 1];
        if (!v.done) {
            const num = data[n.row][n.col + 1].number;
            if (num !== 9) {
                ++size;
                f(data[n.row][n.col + 1]);
            }
        }
    }
    // Move down
    if (n.row < data.length - 1) {
        const v = data[n.row + 1][n.col];
        if (!v.done) {
            const num = data[n.row + 1][n.col].number;
            if (num !== 9) {
                ++size;
                f(data[n.row + 1][n.col]);
            }
        }
    }

    if (size === 0) ++size;
    
    return;
    
}

const sizes = [];
lowest_array.forEach((lowest) => {
    size = 0;
    f(lowest);
    sizes.push(size);
});

sizes.sort((a, b) => {
    return b - a;
});

const result = sizes[0] * sizes[1] * sizes[2];

console.log(result);