const fs = require("fs");

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 4/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\r\n').map((n) => {
                return n;
            });
            // Part 1
            let part1Answer = null, part2Answer = null;
            {
                
            }

            // Part 2
            {
               

            }
            
            resolve("hi");
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

