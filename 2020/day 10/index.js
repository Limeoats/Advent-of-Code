const fs = require("fs");
const { exit } = require("process");

function part_1(arr) {
    let one_jolt = [];
    let three_jolt = [];
    let last_number = 0;

    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] - last_number === 1) {
            one_jolt.push(arr[i]);
        }
        else if (arr[i] - last_number === 3) {
            three_jolt.push(arr[i]);
        }
        last_number = arr[i];
    }

    const result = one_jolt.length * (three_jolt.length + 1);
    return result;
}

function part_2(arr) {
    const map = {};
    for (let i = 0; i < arr.length; ++i) {
        map[arr[i]] = {};
        map[arr[i]].options = new Array();
        map[arr[i]].paths = 0;
        map[arr[0]].paths = 1;

        if (arr[i + 1] - arr[i] === 1 || arr[i + 1] - arr[i] === 2 || arr[i + 1] - arr[i] === 3) {
            map[arr[i]].options.push(arr[i + 1]);
        }
        if (arr[i + 2] - arr[i] === 1 || arr[i + 2] - arr[i] === 2 || arr[i + 2] - arr[i] === 3) {
            map[arr[i]].options.push(arr[i + 2]);
        }
        if (arr[i + 3] - arr[i] === 1 || arr[i + 3] - arr[i] === 2 || arr[i + 3] - arr[i] === 3) {
            map[arr[i]].options.push(arr[i + 3]);
        }
    }

    Object.keys(map).forEach(a => {
        for (i = 0; i < map[a].options.length; ++i) {
            let option = map[a].options[i];
            map[option].paths += map[a].paths;
        }
    });

    const last_item = map[arr[arr.length - 1]];

    return last_item.paths;
}

async function get_result() {
    return new Promise( async (resolve, reject) => {

        const data = await fs.promises.readFile("day 10/input.dat", { encoding: "utf-8"});
        const arr = data.split("\r\n").map(Number);
        arr.push(0);
        
        arr.sort((a, b) => a - b);

        const part1_result = part_1(arr);
        const part2_result = part_2(arr);

        resolve(part2_result);
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

