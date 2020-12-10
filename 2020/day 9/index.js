const fs = require("fs");
const { exit } = require("process");

function is_sum_of_previous_n(arr, n, i) {
    for (let a = i - n; a < i; ++a) {
        for (let b = i - n; b < i; ++b) {
            if (arr[a] + arr[b] == arr[i]) {
                return true;
            }
        }
    }
    return false;
}

function part_2(arr, v) {
    let start_index = 0;
    while (true) {
        let nums = [];
        let sum = 0;
        for (let a = start_index; a < arr.length; ++a) {
            sum += arr[a];
            nums.push(arr[a]);
            if (sum === v && nums.length > 1) {
                console.log(nums);
                nums.sort();
                return (nums[0] + nums[nums.length - 1]);
            }
            else if (sum > v) {
                start_index++;
                nums = [];
                sum = 0;
                break;
            }
        }
    }
}

async function get_result() {
    return new Promise( async (resolve, reject) => {

        const data = await fs.promises.readFile("day 9/input.dat", { encoding: "utf-8"});
        const arr = data.split("\r\n").map(Number);

        let answer = 0;
        for (let i = 25; i < arr.length; ++i) {
            if (!is_sum_of_previous_n(arr, 25, i)) {
                answer = arr[i];
                break;
            }
        }

        const result = part_2(arr, answer);

        resolve(result);
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

