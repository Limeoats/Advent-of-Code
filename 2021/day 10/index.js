const fs = require("fs");

const data = fs.readFileSync("day 10/data.txt", { encoding: "utf-8" }).split("\r\n").map((str) => {
    return str.split("");
});

const openChars = ["(", "[", "{", "<"];
const closeChars = [")", "]", "}", ">"];
const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const part2Points = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

function isOpenChar(c) {
    return openChars.indexOf(c) > -1;
}

function isCloseChar(c) {
    return closeChars.indexOf(c) > -1;
}

// Part 1
const firstBadChars = [];
data.forEach((line) => {
    let lookedAt = [];
    let foundBadChar = false;
    for (let a = 0; a < line.length; ++a) {
        const char = line[a];
        if (isOpenChar(char)) {
            lookedAt.push(char);
        }
        else {
            let corrupted = false;
            // Loop through lookedAt backwards and see if the last open char matches
            for (let i = lookedAt.length - 1; i >= 0; --i) {
                if (isCloseChar(lookedAt[i])) continue;
                const index = closeChars.indexOf(char);
                if (openChars.indexOf(lookedAt[i]) !== index) {
                    corrupted = true;
                    foundBadChar = true;
                    firstBadChars.push(char);
                    break;    
                }
                else {
                    lookedAt.pop();
                    break;
                }
            }
            if (corrupted) {
                break;
            }
        }
    }
    if (!foundBadChar) {
        const ix = openChars.indexOf(line[0]);
        const jx = closeChars.indexOf(line[line.length - 1]);
        if (jx === -1 || ix !== jx) {
            // Incomplete line
            return;
        }
    }
});

// Part 2
const results = [];
const nonCorrupted = [];
data.forEach((line) => {
    let lookedAt = [];
    let foundBadChar = false;
    let toComplete = [];
    for (let a = 0; a < line.length; ++a) {
        const char = line[a];
        if (isOpenChar(char)) {
            lookedAt.push(char);
        }
        else {
            let corrupted = false;
            // Loop through lookedAt backwards and see if the last open char matches
            for (let i = lookedAt.length - 1; i >= 0; --i) {
                if (isCloseChar(lookedAt[i])) continue;
                const index = closeChars.indexOf(char);
                if (openChars.indexOf(lookedAt[i]) !== index) {
                    foundBadChar = true;
                    break;    
                }
                else {
                    lookedAt.pop();
                    break;
                }
            }
            if (corrupted) {
                break;
            }
        }
    }
    if (!foundBadChar) {
        nonCorrupted.push(line);
        for (let i = lookedAt.length - 1; i >= 0; --i) {
            const index = openChars.indexOf(lookedAt[i]);
            const cc = closeChars[index];
            toComplete.push(cc);
        }
        results.push(toComplete);
        return;
    }
});

// let sum = 0;
// for (let i = 0; i < firstBadChars.length; ++i) {
//     sum += points[firstBadChars[i]];
// }

const sums = [];
for (let i = 0; i < results.length; ++i) {
    let total = 0;
    for (let j = 0; j < results[i].length; ++j) {
        total *= 5;
        total += part2Points[results[i][j]];
    }
    sums.push(total);
}

sums.sort((a, b) => {
    return a - b;
});
const mid = sums[sums.length / 2 | 0];

console.log(mid);
