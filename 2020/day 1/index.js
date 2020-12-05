const fs = require("fs");

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 1/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\n').map((n) => {
                return parseInt(n);
            });
            for (i = 0; i < arr.length; ++i) {
                for (j = 0; j < arr.length; ++j) {
                    for (k = 0; k < arr.length; ++k) {
                        const res = arr[i] + arr[j] + arr[k];
                        if (res === 2020) {
                            resolve(arr[i] * arr[j] * arr[k]);
                        }
                    }
                }
            }
            resolve("nothing");
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

