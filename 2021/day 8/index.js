const fs = require("fs");

const data = fs.readFileSync("day 8/input.txt", { encoding: "utf-8" }).split("\r\n");

const items = data.map(c => {
    const [patternStr, output] = c.split(" | ");
    const patterns = patternStr.split(" ");
    const outputs = output.split(" ");
    return {
        patterns: patterns,
        outputs: outputs,
    };
});

function not(item, other) {
    for (let a = 0; a < item.length; ++a) {
        if (other.indexOf(item[a]) === -1) {
            return item[a];
        }
    }
    return null;
}

function contains(str, letter) {
    return str.indexOf(letter) > -1;
}

function findConfiguration(input) {
    let p1, p2, p3, p4, p5, p6, p7;
    let one, two, three, four, five, six, seven, eight, nine, zero;

    // This is my ridiculous method of sorting by an arbitrary set of lengths.
    // I'm sure there's a much better way to do this but it's too late to think of one.
    // And this works just fine.
    let sorted = [];
    for (let tt = 0; tt < input.length; ++tt) {
        if (input[tt].length === 2) sorted.push(input[tt]);
    }
    for (let tt = 0; tt < input.length; ++tt) {
        if (input[tt].length === 3) sorted.push(input[tt]);
    }
    for (let tt = 0; tt < input.length; ++tt) {
        if (input[tt].length === 4) sorted.push(input[tt]);
    }
    for (let tt = 0; tt < input.length; ++tt) {
        if (input[tt].length === 7) sorted.push(input[tt]);
    }
    for (let tt = 0; tt < input.length; ++tt) {
        if (input[tt].length === 6) sorted.push(input[tt]);
    }
    for (let tt = 0; tt < input.length; ++tt) {
        if (input[tt].length === 5) sorted.push(input[tt]);
    }

    for (let a = 0; a < sorted.length; ++a) {
        const item = sorted[a];
        if (item.length === 2) {
            one = item;
        }
        if (item.length === 3) {
            seven = item;
            p1 = not(item, one);
        }
        if (item.length === 4) {
            four = item;
        }
        if (item.length === 7) {
            eight = item;
        }
        if (item.length === 6) {
            // Find the one that's just missing "a"
            // This means it's just missing ONE of the items in "one"
            if (!contains(item, one[0]) || !contains(item, one[1])) {
                // We found our six
                six = item;
                p3 = not("abcdefg", item);
                p6 = not(one, p3);
            }
            // Look for nine. We know that zero shares only three segments with "four", which we have.
            // Whereas the other 6-segment number, 9, shares all four
            else if (contains(item, four[0]) && contains(item, four[1]) && contains(item, four[2]) && contains(item, four[3])) {
                nine = item;
                p5 = not("abcdefg", nine);
            }
            else {
                zero = item;
                p4 = not("abcdefg", zero);
            }
        }
        // 2, 3, and 5 are left at this point
        if (item.length === 5) {
            // Find 5
            // 5 doesn't have p3 or p5
            if (!contains(item, p3) && !contains(item, p5)) {
                five = item;
            }
            else if (!contains(item, p6)) {
                two = item;
            }
            else {
                three = item;
            }
        }


    }
    return [
        { 
            key: `${eight}`,
            value: 8,
        },
        {
            key: `${five}`,
            value: 5,
        },
        {
            key: `${two}`,
            value: 2,
        },
        {
            key: `${three}`,
            value: 3,
        },
        {
            key: `${seven}`,
            value: 7,
        },
        {
            key: `${nine}`,
            value: 9,
        },
        {
            key: `${six}`,
            value: 6,
        },
        {
            key: `${four}`,
            value: 4,
        },
        {
            key: `${zero}`,
            value: 0,
        },
        {
            key: `${one}`,
            value: 1,
        }
    ];
}

// Part 1
{
    let sum = 0;
    for (let i = 0; i < items.length; ++i) {
        for (let j = 0; j < items[i].outputs.length; ++j) {
            const b = items[i].outputs[j];
            if (b.length === 2 || b.length === 4 || b.length === 3 || b.length === 7) {
                ++sum;
            }
        }
    };
}

// Part 2
let sum = 0;
for (let i = 0; i < items.length; ++i) {
    let str = "";
    const configuration = findConfiguration(items[i].patterns);
    for (let j = 0; j < items[i].outputs.length; ++j) {
        const b = items[i].outputs[j];
        const sorted = b.split("").sort().join("");
        // Search configuration
        for (let k = 0; k < configuration.length; ++k) {
            if (configuration[k].key.length === sorted.length) {
                const s = configuration[k].key.split("").sort().join("");
                if (s === sorted) {
                    str += configuration[k].value.toString();
                    break;
                }
            }
        }
    }
    sum += Number(str);
}

console.log(sum);