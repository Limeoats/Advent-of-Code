
const fs = require("fs");

function calculate_floor() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 1/input.txt", { encoding: "utf-8" }, (err, data) => {
            let floor = 0;
            let position = 0;
            for (i = 0; i < data.length; ++i) {
                switch (data[i]) {
                    case '(': ++floor; break;
                    case ')': --floor; break;
                }
                if (floor < 0) {
                    position = i + 1;
                    break;
                }
            }
            resolve(position);
        });
    });
}

(async () => {
    const result = await calculate_floor();
    console.log(result);
})();