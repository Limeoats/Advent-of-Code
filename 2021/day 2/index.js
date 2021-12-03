const fs = require("fs");

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 2/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\n').map((n) => {
                return n;
            });
            // Part 1
            let part1Answer = null, part2Answer = null;
            {
                let xPos = 0, depth = 0;
                arr.forEach(c => {
                    const [dir, amount] = c.split(" ");
                    if (dir === "forward") {
                        xPos += Number(amount);
                    }
                    else if (dir === "up") {
                        depth -= Number(amount);
                    }
                    else if (dir === "down") {
                        depth += Number(amount);
                    }
                });
                part1Answer = xPos * depth;
            }

            // Part 2
            {
                let xPos = 0, depth = 0, aim = 0;
                arr.forEach(c => {
                    const [dir, amount] = c.split(" ");
                    if (dir === "forward") {
                        xPos += Number(amount);
                        depth += (aim * Number(amount));
                    }
                    else if (dir === "up") {
                        aim -= Number(amount);
                    }
                    else if (dir === "down") {
                        aim += Number(amount);
                    }
                });
                part2Answer = xPos * depth;
            }
            
            resolve(part2Answer);
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

